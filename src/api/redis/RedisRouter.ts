import { Controller } from "../../controller/Controller";
import { HttpMethods } from "../../enum/HttpMethods";
import { Router } from "../../router/Router";

export default class RedisRouter extends Router {
  constructor(controller: Controller) {
    super({
      basePath: "/redis",
      controller,
    });
  }

  public override setupRoutes(): void {
    this.addEndpoint({
      handlerDescriptor: this.controller.getHandlerByName("getKey"),
      method: HttpMethods.GET,
      path: "",
    });
  }
}
