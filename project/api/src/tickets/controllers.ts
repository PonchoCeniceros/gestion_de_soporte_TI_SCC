import { Request, Response } from 'express';
import { ticketModel } from '../models/ticket.model';
import { userModel } from '../models/user.model';
import ApiResponse from '../domain/apiResponse';
import { TicketStatus } from '../domain/ticket';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Extend the Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Obtener todos los tickets
export async function getAllTickets(req: Request, res: Response) {
  try {
    const { status, date, service, page = 1, limit = 10 } = req.query;
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (service) {
      filter.service = service;
    }

    if (date && typeof date === 'string') {
      const startDate = new Date(date);
      startDate.setUTCHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setUTCHours(23, 59, 59, 999);

      filter.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const tickets = await ticketModel.find(filter)
      .populate('client')
      .populate('service')
      .populate('assignedTo._id', 'name') // Populate assignedTo._id and select only the name field
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ createdAt: -1 }); // Sort by newest first

    const total = await ticketModel.countDocuments(filter);

    res.status(200).json({
      isOk: true,
      message: 'Tickets obtenidos exitosamente',
      data: {
        tickets,
        total,
        totalPages: Math.ceil(total / limitNumber),
        currentPage: pageNumber,
      },
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al obtener los tickets',
      data: null,
    } as ApiResponse<null>);
  }
}

// Crear un nuevo ticket
export async function createTicket(req: Request, res: Response) {
  try {
    const newTicket = new ticketModel(req.body);
    await newTicket.save();
    res.status(201).json({
      isOk: true,
      message: 'Ticket creado exitosamente',
      data: newTicket,
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al crear el ticket',
      data: null,
    } as ApiResponse<null>);
  }
}

// Actualizar el estado de un ticket
export async function updateTicketStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status: newStatus } = req.body;
    const currentUserId = req.userId; // Get current user ID from request

    // 1. Validar el nuevo estado
    if (!newStatus || !Object.values(TicketStatus).includes(newStatus as TicketStatus)) {
      return res.status(400).json({
        isOk: false,
        message: 'El estado proporcionado no es válido.',
        data: null,
      } as ApiResponse<null>);
    }

    // 2. Encontrar el ticket
    const ticket = await ticketModel.findById(id);
    if (!ticket) {
      return res.status(404).json({
        isOk: false,
        message: 'Ticket no encontrado.',
        data: null,
      } as ApiResponse<null>);
    }

    const currentStatus = ticket.status;

    // 3. Aplicar la regla de "no reversión"
    const allowedTransitions: { [key in TicketStatus]?: TicketStatus[] } = {
      [TicketStatus.OPEN]: [TicketStatus.IN_PROGRESS],
      [TicketStatus.IN_PROGRESS]: [TicketStatus.CLOSED],
    };

    if (allowedTransitions[currentStatus] && !allowedTransitions[currentStatus]?.includes(newStatus)) {
      return res.status(400).json({
        isOk: false,
        message: `No se puede cambiar el estado de '${currentStatus}' a '${newStatus}'.`,
        data: null,
      } as ApiResponse<null>);
    }

    if (currentStatus === TicketStatus.CLOSED) {
      return res.status(400).json({
        isOk: false,
        message: 'No se puede cambiar el estado de un ticket cerrado.',
        data: null,
      } as ApiResponse<null>);
    }

    // 4. Auto-asignar si la transición es de Abierto a En Progreso y no está asignado
    if (currentStatus === TicketStatus.OPEN && newStatus === TicketStatus.IN_PROGRESS) {
      if (!ticket.assignedTo && currentUserId) {
        const currentUser = await userModel.findById(currentUserId);
        if (currentUser) {
          ticket.assignedTo = { _id: currentUser._id, name: currentUser.name } as any;
        }
      }
    }

    // 5. Actualizar el ticket
    ticket.status = newStatus;
    ticket.statusHistory.push({ status: newStatus, changedAt: new Date() });

    await ticket.save();

    // Populamos la respuesta para que el frontend tenga los datos completos
    const populatedTicket = await ticket.populate(['client', 'service', 'assignedTo']);

    res.status(200).json({
      isOk: true,
      message: 'Estado del ticket actualizado exitosamente.',
      data: populatedTicket,
    } as ApiResponse<any>);

  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al actualizar el estado del ticket.',
      data: null,
    } as ApiResponse<null>);
  }
}

// Asignar un ticket a un usuario
export async function assignTicket(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        isOk: false,
        message: 'El ID del usuario es requerido.',
        data: null,
      } as ApiResponse<null>);
    }

    const ticket = await ticketModel.findById(id);
    if (!ticket) {
      return res.status(404).json({
        isOk: false,
        message: 'Ticket no encontrado.',
        data: null,
      } as ApiResponse<null>);
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        isOk: false,
        message: 'Usuario no encontrado.',
        data: null,
      } as ApiResponse<null>);
    }

    ticket.assignedTo = { _id: user._id, name: user.name } as any;
    await ticket.save();

    const populatedTicket = await ticket.populate(['client', 'service', 'assignedTo']);

    res.status(200).json({
      isOk: true,
      message: 'Ticket asignado exitosamente.',
      data: populatedTicket,
    } as ApiResponse<any>);

  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al asignar el ticket.',
      data: null,
    } as ApiResponse<null>);
  }
}

// Añadir un adjunto a un ticket
export async function addAttachment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const ticket = await ticketModel.findById(id);

    if (!ticket) {
      return res.status(404).json({
        isOk: false,
        message: 'Ticket no encontrado.',
        data: null,
      } as ApiResponse<null>);
    }

    if (!req.file) {
      return res.status(400).json({
        isOk: false,
        message: 'No se ha subido ningún archivo.',
        data: null,
      } as ApiResponse<null>);
    }

    const originalPath = req.file.path;
    const fileExtension = path.extname(req.file.originalname);
    const compressedFilename = req.file.filename.replace(fileExtension, '-compressed.webp');
    const compressedPath = path.join('public/uploads', compressedFilename);

    // Comprimir la imagen usando sharp
    const outputBuffer = await sharp(originalPath)
      .webp({ quality: 80 }) // Comprimir a WebP con 80% de calidad
      .toBuffer();

    await fs.promises.writeFile(compressedPath, outputBuffer);

    // Eliminar el archivo original subido por multer
    fs.unlinkSync(originalPath);

    // Añadir la ruta del archivo comprimido a los adjuntos del ticket
    // Guardamos la ruta relativa para que sea accesible desde el frontend
    const relativePath = `/uploads/${compressedFilename}`;
    ticket.attachments!.push(relativePath);

    await ticket.save();

    const populatedTicket = await ticket.populate(['client', 'service', 'assignedTo']);

    res.status(200).json({
      isOk: true,
      message: 'Adjunto añadido exitosamente.',
      data: populatedTicket,
    } as ApiResponse<any>);

  } catch (error) {
    console.error('Error al añadir el adjunto:', error);
    res.status(500).json({
      isOk: false,
      message: 'Error al añadir el adjunto.',
      data: null,
    } as ApiResponse<null>);
  }
}
