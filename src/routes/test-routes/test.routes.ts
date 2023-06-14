import { Router, Application } from "express";
import * as test from "@controllers/test-controller/test.controller";
import auth from "@auth/index";

export default (app: Application): void => {
  const router = Router();

  router.get("/create", test.testCreate);
  router.get("/jwt", auth.authenticationToken, test.testCreate);

  app.use("/api", router);
};
