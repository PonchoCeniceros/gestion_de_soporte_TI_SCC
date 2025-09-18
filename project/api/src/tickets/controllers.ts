import { Request, Response } from 'express';
import { ticketModel } from '../models/ticket.model';
import ApiResponse from '../domain/apiResponse';

// Obtener todos los tickets
export async function getAllTickets(req: Request, res: Response) {
  try {
    const tickets = await ticketModel.find().populate('client').populate('service');
    res.status(200).json({
      isOk: true,
      message: 'Tickets obtenidos exitosamente',
      data: tickets,
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
