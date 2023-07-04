import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorMessage = error.message || 'Internal Server Error';
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  logger.error(errorMessage);

  const errorResponse = {
    error: errorMessage,
    statusCode: statusCode,
  };

  // Set headers for JSON response
  res.setHeader('Content-Type', 'application/json');

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
