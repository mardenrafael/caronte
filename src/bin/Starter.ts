import Application from "./Application";
import ApplicationManager from "../manager/ApplicationManager";
import Manager from "../manager/Manager";
import {
  HealthCheckController,
  HealthCheckRouter,
} from "../api/healthCheck";

export default class Starter {
  private readonly applicationManager: Manager<Application>;

  constructor() {
    this.applicationManager =
      ApplicationManager.getApplicationManagerInstance();
  }

  private setupHealthChecker(): void {
    if (this.applicationManager instanceof ApplicationManager) {
      const healthCheckController = new HealthCheckController();
      const healthCheckRouter = new HealthCheckRouter(
        healthCheckController,
      );

      this.applicationManager.add(healthCheckController);
      this.applicationManager.add(healthCheckRouter);
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
