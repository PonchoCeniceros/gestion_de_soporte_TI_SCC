// dominio
// infraestructura
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './auth/routes';
import ticketsRouter from './tickets/routes';
import clientsRouter from './clients/routes';
import servicesRouter from './services/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Cargar variables de entorno desde .env
dotenv.config();

// Verificar que los parametros de la API estén definidos
if (
  !process.env.SECRET_KEY ||
  !process.env.TITLE ||
  !process.env.VERSION ||
  !process.env.API_URL ||
  !process.env.DESCRIPTION
) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    '[CRITICAL] Una o varias variables de entorno de la API no está definidas. Por favor, configúrelas en su archivo .env'
  );
  process.exit(1);
}

/**
 * se instancia la API
 */
const api = express();

/**
 * Servir archivos estáticos desde el directorio "public"
 */
api.use(express.static('public'));

/**
 * middleware que solo analiza JSON y solo observa
 * las solicitudes en las que el encabezado de tipo
 * de contenido coincide con la opción de tipo
 */
api.use(express.json());

/**
 * Habilitar CORS para todas las rutas
 */
api.use(cors({
  origin: process.env.FRONTEND_AVAILABLE_URL, // Permite solo este origen
  credentials: true, // Permite el uso de cookies y headers con credenciales
}));

/**
 * Configuración de Swagger
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: process.env.TITLE,
      version: process.env.VERSION,
      description: process.env.DESCRIPTION,
    },
    servers: [
      {
        url: process.env.API_URL,
      },
    ],
  },
  apis: ['./src/auth/routes.ts', './src/tickets/routes.ts', './src/clients/routes.ts', './src/services/routes.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
const swaggerUiOptions = {
  customCssUrl: '/custom-swagger.css',
  customfavIcon: '/favicon.ico',
  customSiteTitle: `${process.env.TITLE} | Docs`
};

api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));

/**
 * router general de la API:
 * aqui se definen las rutas base para las
 * diversas funcionalidades de la aplicación
 */
api.use(`/${process.env.VERSION}/auth`, authRouter);
api.use(`/${process.env.VERSION}/tickets`, ticketsRouter);
api.use(`/${process.env.VERSION}/clients`, clientsRouter);
api.use(`/${process.env.VERSION}/services`, servicesRouter);

export default api;
