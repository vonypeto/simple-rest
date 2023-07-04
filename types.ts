import { Request as ExpressRequest } from 'express';
import DecodedToken from 'jsonwebtoken';

export type Request = ExpressRequest & {
  ctx: Partial<{
    claims: { email: string; password: string };
    userId: string;
  }>;
};
