import db from "@models/index";
import mongoose, { ConnectOptions } from "mongoose";

export default async (): Promise<void> => {
  try {
    db.mongoose.set("strictQuery", true);
    await db.mongoose
      .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log("Connected to the database!");
      })
      .catch((err: Error) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
      });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log((e as Error).message);
    }
  }
};
