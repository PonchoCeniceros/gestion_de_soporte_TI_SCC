import winston from 'winston';

/**
 * Configuración básica del logger
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: process.env.LOGGER_FILE })
  ],
});

export default logger;
