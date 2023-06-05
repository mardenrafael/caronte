import { ApplicationManager, Manager } from ".";
import { Application } from "../bin";
import { Router } from "../router/Router";

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

  public override add(router: Router): void {
    this.managed.push(router);
  }

  private mountRoutes(application: Application): void {
    this.managed.forEach(route => {
      application.mountRoute(route.export());
    });
  }

  public override load(): void {}

  public override setup(): void {
    this.managed.forEach(route => {
      route.setupRoutes();
    });
  }
  public override mount(): void {
    this.mountRoutes(
      ApplicationManager.getApplicationManagerInstance().getApplicationInstance(),
    );
  }
}
