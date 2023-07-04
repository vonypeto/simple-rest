import { Request, Response, NextFunction } from "express";
import db from "../models";

const Accounts = db.accountdb;

export const deleteUserByEmail = async (email) => {
  try {
    // Check if the user exists in the database
    const user = await Accounts.findOne({ email: email });
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    // Delete the user
    await Accounts.findByIdAndDelete(user._id);

    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};
