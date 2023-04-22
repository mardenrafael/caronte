import { Request, Response } from "express";
import { HttpMethods } from "../../router/abstractRouter/AbstractRouter";
import { AbstractController } from "../AbstractController";

export default class UserController extends AbstractController {
  constructor() {
    super(UserController.name);
  }

  private async teste01(_req: Request, res: Response): Promise<void> {
    res.json({
      message: "ok 1",
    });
  }
  private async teste02(_req: Request, res: Response): Promise<void> {
    res.json({
      message: "ok",
    });
  }
  private async teste03(_req: Request, res: Response): Promise<void> {
    res.json({
      message: "ok 3",
    });
  }

  public override setupHandlers(): void {
    super.addHandler({
      handler: this.teste01,
      method: HttpMethods.GET,
    });
    super.addHandler({
      handler: this.teste02,
      method: HttpMethods.POST,
    });
    super.addHandler({
      handler: this.teste03,
      method: HttpMethods.GET,
    });
  }
}
