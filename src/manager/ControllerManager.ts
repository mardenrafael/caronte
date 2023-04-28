import { Controller } from "../controller/Controller";
import Manager from "./Manager";

export default class ControllerManager extends Manager<Controller> {
  private static controllerManagerInstance: ControllerManager;
  private readonly controllers: Controller[];

  private constructor() {
    super(ControllerManager.name);
    this.controllers = [];
  }

  public static getControlllerManagerInstance(): ControllerManager {
    if (!this.controllerManagerInstance) {
      this.controllerManagerInstance = new ControllerManager();
    }

    return this.controllerManagerInstance;
  }
  public add(controller: Controller): void {
    this.controllers.push(controller);
  }

  private setupAllHandlers(): void {
    this.controllers.forEach(controller => {
      controller.setupHandlers();
    });
  }
  public override setup(): void {
    this.setupAllHandlers();
  }
  public override mount(): void {}
}
