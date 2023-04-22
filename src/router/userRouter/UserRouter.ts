import AbstractRouter, {
  ApplicationRoute,
  HttpMethods,
} from "../abstractRouter/AbstractRouter";

export default class UserRouter extends AbstractRouter {
  constructor({ basePath, controller }: ApplicationRoute) {
    super({
      basePath,
      controller,
    });
  }

  public override setupRoutes(): void {
    super.addEndpoint({
      method: HttpMethods.GET,
      path: "",
      handler: this.controller.getHandlerByName("getUser"),
    });
    super.addEndpoint({
      method: HttpMethods.POST,
      path: "",
      handler: this.controller.getHandlerByName("getUserbyId"),
    });
  }
}
