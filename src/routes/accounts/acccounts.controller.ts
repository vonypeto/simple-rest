import { Response, NextFunction } from 'express';
import AccountModel from '../../models/account';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request } from '../../../types';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.ctx);
    const { email, password } = req.ctx.claims;
    // Check if the user exists in the database
    const user = await AccountModel.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid email' });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5h', // Set the expiration time as per your requirements
      }
    );

    res.json({ token });
  } catch (error: unknown) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, name } = req.body as {
      email: string;
      password: string;
      name: string;
    };

    const existingUser = await AccountModel.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AccountModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5h', // Set the expiration time as per your requirements
      }
    );
    res.json({ token });
  } catch (error: unknown) {
    next(error);
  }
};
