import { Router, Application } from "express";
import * as test from "@controllers/test-controller/test.controller";
import auth from "@auth/index";

export default (app: Application): void => {
  const router = Router();

  router.post("/create", test.testCreate);
  router.get("/setredis", test.redisCreate);
  router.get("/getredis", test.redisGet);
  router.get("/jwt", auth.authenticationToken, test.testCreate);

  app.use("/api", router);
};
