import { Request, Response } from "express";
import { AbstractController } from "../AbstractController";

export default class UserController extends AbstractController {
  public override async handler(
    _req: Request,
    res: Response,
  ): Promise<void> {
    res.json({
      message: "sucess",
    });
  }
}
