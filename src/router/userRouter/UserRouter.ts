import { UserController } from "../../controller/UserController";
import AbstractRouter, {
  ApplicationRoute,
  HttpMethods,
} from "../abstractRouter/AbstractRouter";

export default class UserRouter extends AbstractRouter {
  constructor({ basePath }: ApplicationRoute) {
    super({
      basePath,
    });
  }

  protected override setupRoutes(): void {
    super.addEndpoint({
      controller: new UserController(),
      method: HttpMethods.GET,
      path: "",
    });
    super.addEndpoint({
      controller: new UserController(),
      method: HttpMethods.GET,
      path: "",
    });
    super.addEndpoint({
      controller: new UserController(),
      method: HttpMethods.POST,
      path: "",
    });

    // super.addEndpoint({
    //   controller: (_req: Request, res: Response) => {
    //     res.json({
    //       message: "ok 2",
    //     });
    //   },
    //   method: HttpMethods.GET,
    //   path: "",
    // });
  }
}
