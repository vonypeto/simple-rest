import { Router, Application } from 'express';
import * as Product from '@src/routes/products/product.controller';

export default (app: Application): void => {
  const router = Router();

  router.get('/:userId/product', Product.ListProduct);
  router.put('/product/create', Product.CreateProduct);
  router.post('/product/update/:id', Product.UpdateProduct);
  router.delete('/product/delete/:id', Product.DeleteProduct);
  app.use('/api', router);
};
