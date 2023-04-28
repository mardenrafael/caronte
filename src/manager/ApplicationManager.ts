import { json } from "express";
import Application from "../Application";
import Logger from "../utils/Logger";
import morgan from "morgan";
import ControllerManager from "./ControllerManager";
import RouterManager from "./RouterManager";
import { Router } from "../router/Router";
import { Controller } from "../controller/Controller";
import dotenv from "dotenv";
import Manager from "./Manager";

export default class ApplicationManager extends Manager<Application> {
  private static instance: ApplicationManager;
  private application: Application | undefined;
  private readonly logger: Logger;
  private port!: number;
  private host!: string;
  private isInitialize: boolean = false;
  private isDev: Boolean = false;
  private isConfigured: Boolean = false;
  private readonly controllerManager: Manager<Controller>;
  private readonly routerManager: Manager<Router>;

  private constructor() {
    super(ApplicationManager.name);
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
    dotenv.config();

    if (!this.application) {
      throw new Error("Application is not load properly");
    }

    if (this.isConfig()) {
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

    this.setPort(Number.parseInt(portStr));
    this.setHost(host);

    if (nodeEnv === "development") {
      this.setIsDevMode(true);
    } else {
      this.setIsDevMode(false);
    }

    this.application.use(json());
    this.application.use(morgan("dev")); //mover para middleware

    this.application.setPort(this.getPort());
    this.application.setHost(this.getHost());

    this.setIsConfig(true);
    if (this.isDevMode()) {
      console.log("Config setup done!");
    }
  }

  public addRouter(router: Router): void {
    this.routerManager.add(router);
  }

  public addController(controller: Controller): void {
    this.controllerManager.add(controller);
  }

  public add(item: Router | Controller | Application): void {
    if (item instanceof Controller) {
      this.controllerManager.add(item);
      return;
    }

    if (item instanceof Router) {
      this.routerManager.add(item);
    }
  }

  public start(): void {
    if (!this.application) {
      throw new Error("Application is not load properly");
    }

    this.application.start();
  }

  public override setup(): void {
    this.controllerManager.setup();
    this.routerManager.setup();
  }
  public override mount(): void {
    this.routerManager.mount();
  }

  public getPort(): number {
    return this.port;
  }

  public setPort(port: number): void {
    this.port = port;
  }

  public getHost(): string {
    return this.host;
  }

  public setHost(host: string): void {
    this.host = host;
  }

  public isConfig(): Boolean {
    return this.isConfigured;
  }
  public setIsConfig(value: Boolean): void {
    this.isConfigured = value;
  }

  public isDevMode(): Boolean {
    return this.isDev;
  }
  public setIsDevMode(value: Boolean): void {
    this.isDev = value;
  }

  public getControllerManager(): Manager<Controller> {
    return this.controllerManager;
  }

  public getRouterManager(): Manager<Router> {
    return this.routerManager;
  }
}
