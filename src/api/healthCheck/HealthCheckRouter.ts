import { HttpMethods } from "../../enum/HttpMethods";
import { Router } from "../../router/Router";

export default class HealthCheckRouter extends Router {
  constructor() {
    super({
      basePath: "/health",
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
