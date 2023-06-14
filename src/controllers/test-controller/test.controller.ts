import logger from "@utils/logger";
import { Request, Response } from "express";
import mongoose from "mongoose";
import db from "@models/index";
const TestDB = db.testdb;
// const HouseHoldMembers = db.household_members;
// const HouseHoldName = db.households;
// const pageSizeOptions = [5, 10, 20, 50, 100];

export const testCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Test Create
    const testDbId = new mongoose.Types.ObjectId();
    const testDbData = new TestDB({ _id: testDbId, name: "test", age: 12 });
    await testDbData.save();

    res.json("saved");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      logger.error(error.message);
    }
  }
};
