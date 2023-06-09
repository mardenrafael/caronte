import { ApplicationManager, ResourceManager } from "../manager";
import Application from "./Application";
import Manager from "../manager/Manager";
import {
  HealthCheckController,
  HealthCheckRouter,
} from "../api/healthCheck";
import Resource from "./Resource";

export default class Starter {
  private readonly applicationManager: Manager<Application>;

  constructor() {
    this.applicationManager =
      ApplicationManager.getApplicationManagerInstance();
  }

  private setupHealthChecker(): void {
    if (this.applicationManager instanceof ApplicationManager) {
      const healthCheckController = new HealthCheckController();
      const healthCheckRouter = new HealthCheckRouter();
      const healthResource = new Resource();

      healthResource.setRouter(healthCheckRouter);
      healthResource.setController(healthCheckController);

      ResourceManager.getResourceManagerInstance().add(healthResource);
    } else {
      throw new Error("Error on setup healthchecker");
    }
  }

  public start(): void {
    if (this.applicationManager instanceof ApplicationManager) {
      this.setupHealthChecker();

      this.applicationManager.initApplication();
      this.applicationManager.config();
      this.applicationManager.setup();
      this.applicationManager.mount();
      this.applicationManager.load();
      this.applicationManager.start();
    } else {
      throw new Error("Error on start aplication");
    }
  }
}
