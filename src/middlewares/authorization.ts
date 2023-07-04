import { Request } from '../../types';
import { Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import logger from '../middlewares/logger';

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  const [type, token] = authHeader.split(' ');
  if (type === 'Basic') {
    const [email, password] = Buffer.from(token, 'base64')
      .toString()
      .split(':');
    req.ctx = { ...req.ctx, claims: { email, password } };
    return next();
  } else if (type === 'Bearer') {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
        if (err) {
          console.error(err.message);
          logger.error('Error in jwt:', err);
          return res.sendStatus(403);
        }
        req.ctx = { ...req.ctx, userId: decoded?.userId };
        next();
      }
    );
  } else {
    return res.sendStatus(403);
  }
}
