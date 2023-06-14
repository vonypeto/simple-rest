import { Request, Response, NextFunction } from "express";

const allowCors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Set CORS preflight cache duration (optional)
  res.setHeader("Access-Control-Max-Age", "86400");

  // Enable credentials (optional)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent MIME type sniffing
  res.setHeader("X-Download-Options", "noopen");
  next();
};

export default allowCors;
