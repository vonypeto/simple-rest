import express from "express";
import testRoutes from "@routes/test-routes/test.routes";

export default (app: express.Application): void => {
  testRoutes(app);
};
