import * as dotenv from "dotenv";
import "./module-alias.config";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import middlewareHandler from "@src/middlewares/";
import { connect } from "./src/config/db.connection";
import routes from "./src/routes";

connect();

const app: Express = express();

app.use(middlewareHandler.allowCors);
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(middlewareHandler.requestLogger);
app.use(middlewareHandler.errorHandler);
app.use(middlewareHandler.validationMiddleware);

app.get("/", (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

routes(app);
export default app;
