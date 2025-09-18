import api from './api';
import MongoConnector from './services/mongo.connector';

// Cargar variables de entorno desde .env (se hace una sola vez aquí)
// dotenv.config(); // Eliminado, ya que se cargará en api.ts

/**
 * definir puerto de salida de la api
 */
const port = process.env.PORT || 3000;

/**
 * lanzamiento de la api
 */
api.listen(port, async () => {
  MongoConnector.connect();
  console.log('\x1b[31m%s\x1b[0m', `[*] api corriendo por el puerto ${port}`);
});
