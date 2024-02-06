import { Router } from "express";
import app from "../index";
import Test from "../routers/test";

const routerApi = Router();

export default class Routers {
  constructor() {
    this.apiRoutes();
  }

  private apiRoutes() {
    routerApi.use("/test", new Test().build());
  }

  public Build() {
    app.use("/api", routerApi);
  }
}