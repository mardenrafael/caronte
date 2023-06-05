import { Controller } from "../controller/Controller";
import { ControllerManager, RouterManager } from "../manager";
import { Router } from "../router/Router";

export default class Resource {
  private controller?: Controller;
  private router?: Router;

  public setController(controller: Controller): void {
    this.controller = controller;
  }

  public setRouter(router: Router): void {
    this.router = router;
  }

  public setupResource(): void {
    if (this.router == undefined) {
      throw new Error("Router cannot be undefined " + this);
    }
    if (this.controller == undefined) {
      throw new Error("Controller cannot be undefined " + this);
    }

    this.router.setController(this.controller);
    RouterManager.getRouterManagerInstance().add(this.router);
    ControllerManager.getControlllerManagerInstance().add(this.controller);
  }
}
