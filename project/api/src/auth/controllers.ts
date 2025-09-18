// dominio
import Session from '../domain/session';
import ApiResponse from '../domain/apiResponse';
import { JwtPayload } from '../domain/jwtPayload';
// aplicación
import { userModel } from '../models/user.model';
// infraestructura
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

/**
 *
 */
export async function registerEndpoint(req: Request, res: Response) {
  try {
    const { name, password } = req.body;
    const role = 'user'; // Asignar rol por defecto 'user'

    const existingUser = await userModel.findOne({ name });
    if (existingUser) {
      res.status(400).json({ message: 'Error de registro: el usuario ya existe' });
      return; // Añadir return para evitar que el código continúe ejecutándose
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      isOk: true,
      message: 'Usuario registrado exitosamente',
      data: null
    } as ApiResponse<null>);

  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({
      isOk: false,
      message: 'Error al registrar el usuario',
      data: null
    } as ApiResponse<null>);
  }
};

/**
 *
 */
export async function loginEndpoint(req: Request, res: Response) {
  try {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      console.error('La clave secreta no está definida en las variables de entorno');
      res.status(500).json({
        isOk: false,
        message: 'Error del servidor: la configuración de seguridad no está completa.',
        data: null
      } as ApiResponse<null>);
      return;
    }

    const { name, password } = req.body;
    const user = await userModel.findOne({ name });

    if (!user) {
      res.status(401).json({ message: 'Error de autenticación: credenciales inválidas' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Error de autenticación: credenciales inválidas' });
      return;
    }
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1m' });
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded) {
      res.status(401).json({ message: 'Error al generar el payload' });
      return;
    }

    const session: Session = {
      token: token,
      role: user.role,
      expiresAt: decoded.exp
    };

    res.status(200).json({
      isOk: true,
      message: `usuario autenticado correctamente`,
      data: session
    } as ApiResponse<Session>);

  } catch (error) {
    console.error('Error al intentar hacer login:', error)
    res.status(500).json({
      isOk: false,
      message: 'Error al intentar hacer login',
      data: null
    } as ApiResponse<null>);
  }
}
