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

// Actualizar un cliente
export async function updateClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedClient = await clientModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClient) {
      return res.status(404).json({ isOk: false, message: 'Cliente no encontrado' });
    }
    res.status(200).json({
      isOk: true,
      message: 'Cliente actualizado exitosamente',
      data: updatedClient,
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al actualizar el cliente',
      data: null,
    } as ApiResponse<null>);
  }
}

// Eliminar un cliente
export async function deleteClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedClient = await clientModel.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ isOk: false, message: 'Cliente no encontrado' });
    }
    res.status(200).json({
      isOk: true,
      message: 'Cliente eliminado exitosamente',
      data: null,
    } as ApiResponse<null>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al eliminar el cliente',
      data: null,
    } as ApiResponse<null>);
  }
}
