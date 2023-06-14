import logger from "@utils/logger";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import db from "@models/index";
const TestDB = db.testdb;
// const HouseHoldMembers = db.household_members;
// const HouseHoldName = db.households;
// const pageSizeOptions = [5, 10, 20, 50, 100];

export const test2 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json({ hello: "I seee youuu" });
  } catch (error: unknown) {
    next(error);
  }
};
