import { Request, Response } from "express";
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
      handler: (_req: Request, res: Response) => {
        res.json({
          message: "ok",
        });
      },
      method: HttpMethods.GET,
      path: "",
      param: "",
    });

    super.addEndpoint({
      handler: (_req: Request, res: Response) => {
        res.json({
          message: "ok 2",
        });
      },
      method: HttpMethods.GET,
      path: "user",
      param: "?id=3",
    });
  }
}
