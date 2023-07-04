import mongoose  from "mongoose";
import dbConfig from "./db.config";
import { ConnectOptions } from "mongoose";

let isConnected = false;

export const connect = async (): Promise<void> => {
  try {
    if (mongoose.STATES.connected) {
      console.log("Database is already connected!");
      return;
    }

    mongoose.set("strictQuery", true);
    await mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    isConnected = true;
    console.log("Connected to the database!");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Cannot connect to the database!", err.message);
    }
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    if (!isConnected) {
      console.log("Database is already disconnected!");
      return;
    }

    await mongoose.disconnect();
    isConnected = false;
    console.log("Disconnected from the database!");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error while disconnecting from the database!", err.message);
    }
  }
};
