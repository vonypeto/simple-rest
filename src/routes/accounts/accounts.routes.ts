import { Router, Application } from 'express';
import * as Accounts from './acccounts.controller';

export default (app: Application): void => {
  const router = Router();
  router.post('/auth', Accounts.login);
  router.post('/register', Accounts.register);
  app.use('/api', router);
};
