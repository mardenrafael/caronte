import express, { Express, Router, json } from "express";
import morgan from "morgan";

export default class Application {
  private readonly app: Express = express();
  private port: number | undefined;
  private host: string | undefined;
  private dev: boolean = true;

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
    if (!this.isConfigDone) {
      this.config();
    }

    this.app.use(handler);
    if (this.dev) {
      console.log(`New handler register`);
    }
  }

  public mountRoute(route: Router): void {
    if (!this.isConfigDone) {
      this.config();
    }
    this.app.use(route);
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

    if (!this.isConfigDone) {
      this.config();
    }

    this.app.listen(this.port, this.host, () => {
      console.log(`Caronte listen on ${this.host}:${this.port}`);
    });
  }
}
