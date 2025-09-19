import { Request, Response } from 'express';
import { userModel } from '../models/user.model';
import ApiResponse from '../domain/apiResponse';

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userModel.find().select('_id name'); // Solo selecciona _id y name
    res.status(200).json({
      isOk: true,
      message: 'Usuarios obtenidos exitosamente',
      data: users,
    } as ApiResponse<any>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al obtener los usuarios',
      data: null,
    } as ApiResponse<null>);
  }
}
