import { Router, Application } from 'express';
import * as Product from '@src/routes/products/product.controller';
import auth from '../../auth';

export default (app: Application): void => {
  const router = Router();

  router.get('/:userId/product', auth.authenticationToken, Product.ListProduct);
  router.put(
    '/product/create',
    auth.authenticationToken,
    Product.CreateProduct
  );
  router.post(
    '/product/update/:id',
    auth.authenticationToken,
    Product.UpdateProduct
  );
  router.delete(
    '/product/delete/:id',
    auth.authenticationToken,
    Product.DeleteProduct
  );
  app.use('/api', router);
};
