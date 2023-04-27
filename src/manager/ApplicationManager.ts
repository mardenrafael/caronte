import { json } from "express";
import Application from "../Application";
import Logger from "../utils/Logger";
import morgan from "morgan";
import ControllerManager from "./ControllerManager";
import RouterManager from "./RouterManager";
import { AbstractRouter } from "../router/abstractRouter";
import { AbstractController } from "../controller/AbstractController";

export default class ApplicationManager {
  private static instance: ApplicationManager;
  private application: Application | undefined;
  private readonly logger: Logger;
  private port!: number;
  private host!: string;
  private isInitialize: boolean = false;
  private isDevMode: Boolean = false;
  private isConfig: Boolean = false;
  private readonly controllerManager: ControllerManager;
  private readonly routerManager: RouterManager;

  private constructor() {
    this.logger = new Logger();
    this.controllerManager =
      ControllerManager.getControlllerManagerInstance();
    this.routerManager = RouterManager.getRouterManagerInstance();
  }

  public static getApplicationManagerInstance(): ApplicationManager {
    if (!this.instance) {
      this.instance = new ApplicationManager();
    }

    return this.instance;
  }

  public getApplicationInstance(): Application {
    if (!this.isInitialize) {
      this.application = new Application();
      this.isInitialize = true;

      this.logger.log("New application instance created");
    }

    return this.application!;
  }

  public config(): void {
    if (!this.application) {
      throw new Error("Application is not load properly");
    }

    if (this.isConfig) {
      return;
    }

    const nodeEnv = process.env["NODE_ENV"];
    const portStr = process.env["PORT"];
    const host = process.env["HOST"];

    if (!portStr) {
      throw new Error("Error on load env vars");
    }

    if (!host) {
      throw new Error("Error on load env vars");
    }

    if (!nodeEnv) {
      throw new Error("Error on load env vars");
    }

    this.port = Number.parseInt(portStr);
    this.host = host;

    if (nodeEnv === "development") {
      this.isDevMode = true;
    } else {
      this.isDevMode = false;
    }

    this.application.use(json());
    this.application.use(morgan("dev"));

    this.application.setPort(this.port);
    this.application.setHost(this.host);

    this.isConfig = true;
    if (this.isDevMode) {
      console.log("Config setup done!");
    }
  }

  public addRouter(router: AbstractRouter): void {
    this.routerManager.add(router);
  }

  public addController(controller: AbstractController): void {
    this.controllerManager.add(controller);
  }

  public add<T extends AbstractController | AbstractRouter>(
    item: T,
  ): void {
    if (item instanceof AbstractController) {
      this.controllerManager.add(item);
      return;
    }

    if (item instanceof AbstractRouter) {
      this.routerManager.add(item);
    }
  }

  public start(): void {
    if (!this.application) {
      throw new Error("Application is not load properly");
    }

    this.controllerManager.setupAllHandlers();
    this.routerManager.setupRoute();
    this.routerManager.mountRoutes(this.application);

    this.application.start();
  }
}
