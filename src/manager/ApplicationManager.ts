import { json } from "express";
import morgan from "morgan";
import { Application } from "../bin";
import { Controller } from "../controller/Controller";
import { Router } from "../router/Router";
import { ControllerManager, RouterManager, Manager } from ".";
import { Logger, EnvLoader } from "../utils";

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
    if (this.isInitialized() == false) {
      this.application = new Application();

      this.logger.log("New application instance created");
      this.setIsInitialized(true);
    }

    return this.application!;
  }

  public initApplication(): void {
    this.getApplicationInstance();
  }

  public config(): void {
    if (this.isConfig()) {
      return;
    }

    if (this.isInitialized() == false) {
      throw new Error("Application is not load properly");
    }

    const portStr = EnvLoader.load("PORT");
    const host = EnvLoader.load("HOST");
    const nodeEnv = EnvLoader.load("NODE_ENV");

    this.setPort(Number.parseInt(portStr));
    this.setHost(host);

    if (nodeEnv === "development") {
      this.setIsDevMode(true);
    } else {
      this.setIsDevMode(false);
    }

    this.application!.use(json());
    this.application!.use(morgan("dev")); //mover para middleware

    this.application!.setPort(this.getPort());
    this.application!.setHost(this.getHost());

    this.setIsConfig(true);
    if (this.isDevMode()) {
      this.logger.log("Config setup done!");
    }
  }

  public add(item: Router | Controller | Application): void {
    if (item instanceof Controller) {
      this.controllerManager.add(item);
      return;
    }

    if (item instanceof Router) {
      this.routerManager.add(item);
      return;
    }
  }

  public start(): void {
    if (this.isInitialized() == false) {
      throw new Error("Application is not load properly");
    }

    this.application!.start();
  }

  public override setup(): void {
    this.controllerManager.setup();
    this.routerManager.setup();
  }
  public override mount(): void {
    this.routerManager.mount();
  }
  public override load(): void {
    this.controllerManager.load();
    this.routerManager.load();
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

  public isInitialized(): boolean {
    return this.isInitialize;
  }
  public setIsInitialized(value: boolean): void {
    this.isInitialize = value;
  }
}
