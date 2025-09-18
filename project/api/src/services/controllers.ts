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
