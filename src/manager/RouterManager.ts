import Application from "../Application";
import { AbstractRouter } from "../router/abstractRouter";
import ApplicationManager from "./ApplicationManager";

export default class RouterManager {
  private static instance: RouterManager;
  private readonly app: Application;
  private readonly routes: AbstractRouter[] = [];

  private constructor() {
    this.app = ApplicationManager.getInstance();
  }

  public static getInstance(): RouterManager {
    if (!this.instance) {
      this.instance = new RouterManager();
    }

    return this.instance;
  }

  public add<T extends AbstractRouter>(router: T) {
    this.routes.push(router);
  }

  public mountRoutes(): void {
    this.routes.forEach(route => {
      this.app.mountRoute(route.export());
    });
  }
}
