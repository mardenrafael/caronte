import { Manager } from ".";
import { Controller } from "../controller/Controller";

export default class ControllerManager extends Manager<Controller> {
  private static controllerManagerInstance: ControllerManager;

  private constructor() {
    super(ControllerManager.name);
  }

  public static getControlllerManagerInstance(): ControllerManager {
    if (!this.controllerManagerInstance) {
      this.controllerManagerInstance = new ControllerManager();
    }

    return this.controllerManagerInstance;
  }
  public add(controller: Controller): void {
    this.managed.push(controller);
  }

  public override setup(): void {
    this.managed.forEach(controller => {
      controller.setupHandlers();
    });
  }
  public override mount(): void {}
  public override load(): void {}
}
