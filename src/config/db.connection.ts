import mongoose from 'mongoose';
import dbConfig from './db.config';
import { ConnectOptions } from 'mongoose';

export const connect = async (): Promise<void> => {
  try {
    // console.log(mongoose.connection.readyState);
    if (mongoose.connection.readyState == 1) {
      if (!(process.env.NODE_ENV === 'test'))
        console.log('Database is already connected!');
      return;
    }

    mongoose.set('strictQuery', true);
    await mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    if (!(process.env.NODE_ENV === 'test'))
      console.log('Connected to the database!');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Cannot connect to the database!', err.message);
    }
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState == 1) {
      if (!(process.env.NODE_ENV === 'test'))
        console.log('Database is already disconnected!');
      return;
    }

    await mongoose.disconnect();
    if (!(process.env.NODE_ENV === 'test'))
      console.log('Disconnected from the database!');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error while disconnecting from the database!', err.message);
    }
  }
};
