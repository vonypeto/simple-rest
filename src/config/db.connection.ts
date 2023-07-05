import mongoose from 'mongoose';
import dbConfig from './db.config';
import { ConnectOptions } from 'mongoose';
import { info, warn } from '../libs/logger';

export const connect = async (mongodbURI?: string): Promise<void> => {
  try {
    // console.log(mongoose.connection.readyState);
    if (mongoose.connection.readyState == 1) {
      info('Database is already connected!');
      return;
    }

    mongoose.set('strictQuery', true);
    await mongoose.connect(mongodbURI || dbConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    info('Database is already connected!');
  } catch (err: unknown) {
    warn((err as Error).message);
    if (err instanceof Error) {
      console.log('Cannot connect to the database!', err.message);
    }
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState == 1) {
      info('Database is already connected!');
      return;
    }

    await mongoose.disconnect();
    info('Database is already connected!');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error while disconnecting from the database!', err.message);
    }
  }
};
