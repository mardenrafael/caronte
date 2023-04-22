import { Request, Response } from "express";
import { HttpMethods } from "../../router/abstractRouter/AbstractRouter";
import { AbstractController } from "../AbstractController";

export default class UserController extends AbstractController {
  constructor() {
    super(UserController.name);
  }

  public async getUser(_req: Request, res: Response): Promise<void> {
    res.json({
      message: "ok 1",
    });
  }

  public async getUserbyId(_req: Request, res: Response): Promise<void> {
    res.json({
      message: "ok",
    });
  }

  public override setupHandlers(): void {
    this.addHandler({
      handler: this.getUser,
      method: HttpMethods.GET,
    });
    this.addHandler({
      handler: this.getUserbyId,
      method: HttpMethods.POST,
    });
    this.addHandler({
      handler: this.getUserbyId,
      method: HttpMethods.POST,
    });
  }
}
