import express, { Express, Router } from "express";

export default class Application {
  private readonly app: Express = express();
  private dev: boolean = true;
  private port: number | undefined;
  private host: string | undefined;

  public use(handler: any): void {
    this.app.use(handler);
    if (this.dev) {
      console.log(`New handler register`);
    }
  }

  public mountRoute(route: Router): void {
    this.app.use(route);
  }

  public setPort(port: number): void {
    this.port = port;
  }

  public setHost(host: string): void {
    this.host = host;
  }

  public start(): void {
    if (!this.port) {
      throw new Error("Port is not defined properly");
    }
    if (!this.host) {
      throw new Error("Host is not defined properly");
    }

    this.app.listen(this.port, this.host, () => {
      console.log(`Caronte listen on ${this.host}:${this.port}`);
    });
  }
}
