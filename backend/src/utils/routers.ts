import { Router } from "express";
import app from "../index";
import IT from "../routers/IT";

const routerApi = Router();

export default class Routers {
  constructor() {
    this.apiRoutes();
  }

  private apiRoutes() {
    routerApi.use("/it", new IT().build());
  }

  public Build() {
    app.use("/api", routerApi);
  }
}