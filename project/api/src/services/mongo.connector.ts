import mongoose from 'mongoose';

/**
 *
 */
export default class MongoConnector {
  private static instance: mongoose.Connection | null = null;

  /**
   *
   */
  public static async connect(): Promise<void> {

    if (!MongoConnector.instance) {
      const dbUrl = process.env.MONGO_DB_URL;

      if (!dbUrl) {
        throw new Error('MONGO_DB_URL is not defined in .env file');
      }

      await mongoose.connect(dbUrl);
      console.log('\x1b[31m%s\x1b[0m', `[*] conexión a ${dbUrl} exitósa`);

      MongoConnector.instance = mongoose.connection;
    }
  }

  /**
   *
   */
  public static async disconnect(): Promise<void> {
    if (MongoConnector.instance) {
      await mongoose.disconnect();
      MongoConnector.instance = null;
    }
  }
}
