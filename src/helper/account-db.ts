import { Request, Response, NextFunction } from "express";
import db from "../models";

const Accounts = db.accountdb;

export const DeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId;

    // Check if the user exists in the database
    const user = await Accounts.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Delete the user
    await Accounts.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error: unknown) {
    next(error);
  }
};
