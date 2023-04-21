import express, { Express, Router, json } from "express";
import morgan from "morgan";

type ApplicationRoute = {
  path: string;
  routeDescriptor: RouterDescriptor;
};

type RouterDescriptor = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  route: Router;
};

export default class Application {
  private readonly app: Express = express();
  private port: number | undefined;
  private host: string | undefined;
  private dev: boolean = true;
  private routesToMount: Map<String, RouterDescriptor> = new Map<
    String,
    RouterDescriptor
  >();
  private isMounted: boolean = false;
  private isConfigDone: boolean = false;

  constructor() {
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
      this.dev = true;
    } else {
      this.dev = false;
    }
  }

  public setPort(port: number): void {
    this.port = port;

    if (this.dev) {
      console.log(`Port load: ${port}`);
    }
  }

  public setHost(host: string): void {
    this.host = host;
    if (this.dev) {
      console.log(`Host load: ${host}`);
    }
  }

  public use(handler: any): void {
    this.app.use(handler);
    if (this.dev) {
      console.log(`New handler register`);
    }
  }

  public addRoute({ path, routeDescriptor }: ApplicationRoute): void {
    this.routesToMount.set(path, routeDescriptor);
    if (this.dev) {
      console.log(`New route added to list 'Routes to mount' -> ${path}`);
    }
  }

  public mount(): void {
    if (this.isMounted) {
      console.log("Application already did mount");
      return;
    }

    this.routesToMount.forEach((router, path) => {
      this.app.use(router.route);
      if (this.dev) {
        console.log(`New route mounted ${router.method} | ${path}`);
      }
    });
  }

  public config(): void {
    this.app.use(json());
    this.app.use(morgan("dev"));

    this.isConfigDone = true;

    if (this.dev) {
      console.log("Config setup done!");
    }
  }

  public start(): void {
    if (!this.port) {
      throw new Error("'port' not defined properly");
    }

    if (!this.host) {
      throw new Error("'host' not defined properly");
    }

    if (!this.isMounted) {
      this.mount();
    }

    if (!this.isConfigDone) {
      this.config();
    }

    this.app.listen(this.port, this.host, () => {
      console.log(`Caronte listen on ${this.host}:${this.port}`);
    });
  }
}
