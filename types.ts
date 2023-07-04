import { Request as ExpressRequest } from 'express';

export type Request = ExpressRequest & {
  ctx: Partial<{ claims: { email: string; password: string } }>;
};
