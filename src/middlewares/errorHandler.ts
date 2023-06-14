import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorMessage = error.message || "Internal Server Error";
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  logger.error(errorMessage);

  res.status(statusCode).json({ error: errorMessage });
};
