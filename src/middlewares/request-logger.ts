import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = `${req.method} ${req.path}`;
  logger.info(message);
  next();
};
export default requestLogger;
