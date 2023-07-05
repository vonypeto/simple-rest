import './module-alias.config';
import express, { Express, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as middlewareHandler from './src/middlewares/';
import routes from './src/routes';

const app: Express = express();

app.use(middlewareHandler.allowCors);
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(middlewareHandler.requestLogger);
app.use(middlewareHandler.authorization);
app.use(middlewareHandler.errorHandler);
app.use(middlewareHandler.validationMiddleware);

app.get('/', (_, res: Response) => {
  res.send('Express + TypeScript Server');
});

routes(app);
export default app;
