import express from 'express';
import { loginEndpoint, registerEndpoint } from './controllers';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201: 
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error de registro, el usuario ya existe
 *       500:
 *         description: Error al registrar el usuario
 */
router.post('/register/', registerEndpoint);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Error de autenticación, credenciales inválidas
 *       500:
 *         description: Error al intentar hacer login
 */
router.post('/login/', loginEndpoint);

export default router;
