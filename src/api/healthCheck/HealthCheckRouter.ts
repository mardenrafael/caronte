import { Controller } from "../../controller/Controller";
import { Router } from "../../router/Router";
import { HttpMethods } from "../../router/Router/Router";

export default class HealthCheckRouter extends Router {
  constructor(controller: Controller) {
    super({
      basePath: "/health",
      controller,
    });
  }

  public override setupRoutes(): void {
    this.addEndpoint({
      handler: this.controller.getHandlerByName("check"),
      method: HttpMethods.GET,
      path: "",
    });
  }
}
