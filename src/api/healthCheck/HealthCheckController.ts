import { Request, Response } from "express";
import { Controller } from "../../controller/Controller";
import { HttpMethods } from "../../router/Router/Router";

export default class HealthCheckController extends Controller {
  constructor() {
    super(HealthCheckController.name);
  }

  private async check(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      message: "ok",
    });
  }

  public override setupHandlers(): void {
    this.addHandler({
      handler: this.check,
      handlerName: "check",
      method: HttpMethods.GET,
    });
  }
}
