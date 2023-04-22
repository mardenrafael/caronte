import Application from "../Application";
import { AbstractRouter } from "../router/abstractRouter";

export default class RouterManager {
  private static instance: RouterManager;
  private readonly routes: AbstractRouter[] = [];

  private constructor() {}

  public static getRouterManagerInstance(): RouterManager {
    if (!this.instance) {
      this.instance = new RouterManager();
    }

    return this.instance;
  }

  public add<T extends AbstractRouter>(router: T) {
    this.routes.push(router);
  }

  public setupRoute(): void {
    this.routes.forEach(route => {
      route.setupRoutes();
    });
  }

  public mountRoutes(application: Application): void {
    this.routes.forEach(route => {
      application.mountRoute(route.export());
    });
  }
}
