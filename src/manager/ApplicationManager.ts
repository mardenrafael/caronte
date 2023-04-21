import Application from "../Application";
import Logger from "../utils/Logger";

export default class ApplicationManager {
  private static instance: ApplicationManager;
  private application: Application | undefined;
  private readonly logger: Logger;
  private isInitialize: boolean = false;

  private constructor() {
    this.logger = new Logger();
  }

  public static getApplicationInstance(): ApplicationManager {
    if (!this.instance) {
      this.instance = new ApplicationManager();
    }

    return this.instance;
  }

  public initializeApplication(): void {
    if (this.isInitialize) {
      this.logger.log("Application already initialize");
      return;
    }
    this.application = new Application();
    this.isInitialize = true;
  }

  public getApplication(): Application {
    if (!this.isInitialize) {
      this.initializeApplication();
    }
    return this.application!;
  }
}
