import { Router, Application } from 'express';
import * as Accounts from './acccounts.controller';
import auth from '../../auth';

export default (app: Application): void => {
  const router = Router();
  router.post('/auth', auth.authenticationBasic, Accounts.login);
  router.post('/register', Accounts.register);
  app.use('/api', router);
};
