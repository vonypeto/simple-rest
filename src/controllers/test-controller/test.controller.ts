import logger from "@utils/logger";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import db from "@models/index";
const TestDB = db.testdb;

export const testCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ error: "Name and age are required" });
    }

    const testDbId = new mongoose.Types.ObjectId();

    const testDbData = new TestDB({
      _id: testDbId,
      name,
      age,
    });

    await testDbData.save();
    res.json(testDbData);
  } catch (error: unknown) {
    next(error);
  }
};
