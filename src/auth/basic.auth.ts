import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  ctx: {
    claims: { email: string; password: string };
  };
}

export default function (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Basic ')) {
      const encodedCredentials = authHeader.substring('Basic '.length);
      const decodedCredentials = Buffer.from(
        encodedCredentials,
        'base64'
      ).toString();
      const [email, password] = decodedCredentials.split(':');

      req.ctx = {
        claims: {
          email,
          password,
        },
      };

      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}
