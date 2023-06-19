import logger from "@utils/logger";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import db from "@models/index";
import createClient from "@src/config/redis.config";

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

export const redisCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const client = createClient;

    await client.hSet("user-session:55", {
      name: "Von",
      surname: "Aralar",
      company: "Redis",
      age: 29,
    });

    res.send("Cache set successfully.");
  } catch (error: unknown) {
    next(error);
  }
};

export const redisGet = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const client = createClient;
    const query = req.query;
    console.log(query);

    let userSession = await client.hGetAll(`user-session:${query.user}`);
    const result = {
      userSession,
    };

    res.json(result.userSession);
  } catch (error: unknown) {
    next(error);
  }
};
