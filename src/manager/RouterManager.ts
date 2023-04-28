import Application from "../Application";
import { Router } from "../router/Router";
import Manager from "./Manager";

export default class RouterManager extends Manager<Router> {
  private static instance: RouterManager;

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
    this.managed.push(router);
  }

  private setupRoute(): void {
    this.managed.forEach(route => {
      route.setupRoutes();
    });
  }

  private mountRoutes(application: Application): void {
    this.managed.forEach(route => {
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
