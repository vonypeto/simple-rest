import { Router, Application } from "express";
import * as Accounts from "@controllers/accounts-controller/acccounts.controller";

export default (app: Application): void => {
  const router = Router();
  router.post("/auth", Accounts.Login);
  router.post("/register", Accounts.Register);
  app.use("/api", router);
};
