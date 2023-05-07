import { Controller } from "../../controller/Controller";
import { HttpMethods } from "../../enum/HttpMethods";
import { Router } from "../../router/Router";

export default class HealthCheckRouter extends Router {
  constructor(controller: Controller) {
    super({
      basePath: "/health",
      controller,
    });
  }

  public override setupRoutes(): void {
    this.addEndpoint({
      handlerDescriptor: this.controller.getHandlerByName("check"),
      method: HttpMethods.GET,
      path: "",
    });
  }
}
