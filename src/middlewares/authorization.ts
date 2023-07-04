import { NextFunction } from 'express';
import { Request } from '../../types';

export default function (req: Request, _, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  const [type, token] = authHeader.split(' ');
  if (type === 'Basic') {
    const [email, password] = Buffer.from(token, 'base64')
      .toString()
      .split(':');
    req.ctx = { ...req.ctx, claims: { email, password } };
  } else if (type === 'Bearer') {
  }
}
