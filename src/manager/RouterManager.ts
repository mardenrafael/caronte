import { ApplicationManager, Manager } from ".";
import Application from "../bin/Application";
import { Router } from "../router/Router";

export default class RouterManager extends Manager<Router> {
  private static instance: RouterManager;

  private constructor() {
    super(RouterManager.name);
    // this.setApplication(
    //   ApplicationManager.getApplicationManagerInstance().loadApplicationInstance(),
    // );
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

  public override load(): void {}

  public override setup(): void {
    this.setupRoute();
  }
  public override mount(): void {
    this.mountRoutes(
      ApplicationManager.getApplicationManagerInstance().getApplicationInstance(),
    );
  }
}
