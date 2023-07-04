import express from 'express';
import AccountRoutes from './accounts/accounts.routes';
import productsRoutes from './products/products.routes';

export default (app: express.Application): void => {
  AccountRoutes(app);
  productsRoutes(app);
};
