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
      controller: this.controller,
      method: HttpMethods.GET,
      path: "",
    });
    super.addEndpoint({
      controller: this.controller,
      method: HttpMethods.GET,
      path: "",
    });
    super.addEndpoint({
      controller: this.controller,
      method: HttpMethods.POST,
      path: "",
    });
  }
}
