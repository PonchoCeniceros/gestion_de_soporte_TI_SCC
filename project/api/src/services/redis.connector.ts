import dotenv from 'dotenv';
import { createClient } from "redis";

/**
 * Cargar variables de entorno desde .env
 */
dotenv.config();

/**
 *
 */
export async function getSapSession(): Promise<any | null> {
  const url = process.env.REDIS_SESSION_URI || "";
  const redisClient = createClient({ url });
  redisClient.connect();
  const sessionString = await redisClient.get("session");

  const session = sessionString ? JSON.parse(sessionString) : null;
  return session;
}

/**
 *
 */
export async function setSapSession(session: any) {
  const url = process.env.REDIS_SESSION_URI || "";
  const redisClient = createClient({ url });
  redisClient.connect();
  await redisClient.set("session", JSON.stringify(session));
}
