import * as dotenv from "dotenv";
import "./module-alias.config";

dotenv.config();
// Decleare Middleware
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "@utils/logger"; // Import the logger module

// MongoDb Database
import connectionDatabase from "@src/config/db.connection";

connectionDatabase();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `${req.method} ${req.path}`;
  logger.info(message);
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

import routes from "./src/routes";
routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
