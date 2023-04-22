import { AbstractController } from "../controller/AbstractController";

export default class ControllerManager {
  private static controllerManagerInstance: ControllerManager;
  private readonly controllers: AbstractController[];

  private constructor() {
    this.controllers = [];
  }

  public static getControlllerManagerInstance(): ControllerManager {
    if (!this.controllerManagerInstance) {
      this.controllerManagerInstance = new ControllerManager();
    }

    return this.controllerManagerInstance;
  }
  public add<T extends AbstractController>(controller: T): void {
    this.controllers.push(controller);
  }

  public setupAllHandlers(): void {
    this.controllers.forEach(controller => {
      controller.setupHandlers();
    });
  }
}
