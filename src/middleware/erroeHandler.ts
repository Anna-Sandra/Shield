import { Request, Response, NextFunction } from 'express';
import { logger } from "../Utils/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;

  logger.error(
    `${req.method} ${req.originalUrl} - ${statusCode} - ${err.message}`
  );

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
}
