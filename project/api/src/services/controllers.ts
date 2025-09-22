import { Request, Response } from 'express';
import { serviceModel } from '../models/service.model';
import ApiResponse from '../domain/apiResponse';

// Obtener todos los servicios
export async function getAllServices(req: Request, res: Response) {
  try {
    const services = await serviceModel.find();
    res.status(200).json({
      isOk: true,
      message: 'Servicios obtenidos exitosamente',
      data: services,
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al obtener los servicios',
      data: null,
    } as ApiResponse<null>);
  }
}

// Crear un nuevo servicio
export async function createService(req: Request, res: Response) {
  try {
    const newService = new serviceModel(req.body);
    await newService.save();
    res.status(201).json({
      isOk: true,
      message: 'Servicio creado exitosamente',
      data: newService,
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al crear el servicio',
      data: null,
    } as ApiResponse<null>);
  }
}

// Actualizar un servicio
export async function updateService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedService = await serviceModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ isOk: false, message: 'Servicio no encontrado' });
    }
    res.status(200).json({
      isOk: true,
      message: 'Servicio actualizado exitosamente',
      data: updatedService,
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al actualizar el servicio',
      data: null,
    } as ApiResponse<null>);
  }
}

// Eliminar un servicio
export async function deleteService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedService = await serviceModel.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ isOk: false, message: 'Servicio no encontrado' });
    }
    res.status(200).json({
      isOk: true,
      message: 'Servicio eliminado exitosamente',
      data: null,
    } as ApiResponse<null>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al eliminar el servicio',
      data: null,
    } as ApiResponse<null>);
  }
}
