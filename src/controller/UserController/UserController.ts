import { Request, Response } from "express";
import { Controller } from "../Controller";
import { HttpMethods } from "../../enum/HttpMethods";

export default class UserController extends Controller {
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
      handlerDescriptor: {
        handler: this.getUser,
      },
      method: HttpMethods.GET,
      handlerName: "getUser",
    });
    this.addHandler({
      handlerDescriptor: {
        handler: this.getUserbyId,
      },
      method: HttpMethods.POST,
      handlerName: "getUserbyId",
    });
  }
}
