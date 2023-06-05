import { HttpMethods } from "../../enum/HttpMethods";
import { Router } from "../Router";

export default class UserRouter extends Router {
  constructor() {
    super({
      basePath: "/user",
    });
  }

  public override setupRoutes(): void {
    super.addEndpoint({
      method: HttpMethods.GET,
      path: "",
      handlerDescriptor: this.controller.getHandlerByName("getUser"),
    });
    super.addEndpoint({
      method: HttpMethods.POST,
      path: "",
      handlerDescriptor: this.controller.getHandlerByName("getUserbyId"),
    });
  }
}
