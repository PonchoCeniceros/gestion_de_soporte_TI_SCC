import { Request, Response } from 'express';
import { clientModel } from '../models/client.model';
import ApiResponse from '../domain/apiResponse';

// Obtener todos los clientes
export async function getAllClients(req: Request, res: Response) {
  try {
    const clients = await clientModel.find();
    res.status(200).json({
      isOk: true,
      message: 'Clientes obtenidos exitosamente',
      data: clients,
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al obtener los clientes',
      data: null,
    } as ApiResponse<null>);
  }
}

// Crear un nuevo cliente
export async function createClient(req: Request, res: Response) {
  try {
    const newClient = new clientModel(req.body);
    await newClient.save();
    res.status(201).json({
      isOk: true,
      message: 'Cliente creado exitosamente',
      data: newClient,
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al crear el cliente',
      data: null,
    } as ApiResponse<null>);
  }
}
