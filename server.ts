import * as dotenv from "dotenv";
import "./module-alias.config";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import middlewareHandler from "@src/middlewares/";
import connectionDatabase from "@src/config/db.connection";
import routes from "./src/routes";

connectionDatabase();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(middlewareHandler.allowCors);
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(middlewareHandler.requestLogger);
app.use(middlewareHandler.errorHandler);
app.use(middlewareHandler.validationMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
