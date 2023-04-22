import { Request, Response } from "express";
import { HttpMethods } from "../../router/abstractRouter/AbstractRouter";
import { AbstractController } from "../AbstractController";

export default class UserController extends AbstractController {
  constructor() {
    super(UserController.name);
  }

  private async getUser(_req: Request, res: Response): Promise<void> {
    res.json({
      message: "ok 1",
    });
  }

  private async getUserbyId(_req: Request, res: Response): Promise<void> {
    res.json({
      message: "ok",
    });
  }

  public override setupHandlers(): void {
    this.addHandler({
      handler: this.getUser,
      method: HttpMethods.GET,
      name: "getUser",
    });
    this.addHandler({
      handler: this.getUserbyId,
      method: HttpMethods.POST,
      name: "getUserbyId",
    });
  }
}
