import Application from "../Application";
import { Router } from "../router/Router";
import Manager from "./Manager";

export default class RouterManager extends Manager<Router> {
  private static instance: RouterManager;
  private readonly routes: Router[] = [];

  private constructor() {
    super(RouterManager.name);
  }

  public static getRouterManagerInstance(): RouterManager {
    if (!this.instance) {
      this.instance = new RouterManager();
    }

    return this.instance;
  }

  public override add(router: Router) {
    this.routes.push(router);
  }

  private setupRoute(): void {
    this.routes.forEach(route => {
      route.setupRoutes();
    });
  }

  private mountRoutes(application: Application): void {
    this.routes.forEach(route => {
      application.mountRoute(route.export());
    });
  }

  public override setup(): void {
    this.setupRoute();
  }
  public override mount(): void {
    this.mountRoutes(this.getApplication());
  }
}
