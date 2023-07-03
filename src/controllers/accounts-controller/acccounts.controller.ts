import { Request, Response, NextFunction } from "express";
import db from "@models/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import extractCredentials from "@src/utils/extract-credential";
const Accounts = db.accountdb;

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = extractCredentials(req);
    // Check if the user exists in the database
    const user = await Accounts.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5h", // Set the expiration time as per your requirements
      }
    );

    res.json({ token });
  } catch (error: unknown) {
    next(error);
  }
};

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = extractCredentials(req);
    const existingUser = await Accounts.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Accounts.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5h", // Set the expiration time as per your requirements
      }
    );
    res.json({ token });
  } catch (error: unknown) {
    next(error);
  }
};
