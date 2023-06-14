import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = `${req.method} ${req.path}`;
  logger.info(message);
  next();
};
