import { RequestHandler, Router as R } from "express";
import { Controller } from "../../controller/Controller";
import Logger from "../../utils/Logger";
import { HttpMethods } from "../../enum/HttpMethods";

export type ApplicationRoute = {
  basePath: string;
  controller: Controller;
};

export type EndpointDescriptor = {
  method: HttpMethods;
  path: string;
  handler: RequestHandler;
};

export default abstract class Router {
  private readonly basePath: string;
  private readonly router: R;
  private routesToMount: EndpointDescriptor[] = [];
  private readonly logger: Logger;
  protected readonly controller: Controller;

  constructor({ basePath, controller }: ApplicationRoute) {
    this.logger = new Logger();
    this.basePath = basePath;
    this.router = R();
    this.controller = controller;
  }

  protected addEndpoint(endpointDescriptor: EndpointDescriptor): void {
    this.routesToMount.push(endpointDescriptor);
    this.logger.log(
      `New route added to list 'Routes to mount' -> ${
        HttpMethods[endpointDescriptor.method]
      } ${this.basePath}${endpointDescriptor.path}`,
    );
  }

  private define({ method, path, handler }: EndpointDescriptor): void {
    if (method == HttpMethods.GET) {
      this.router.get(this.basePath + path, handler);
      return;
    }
    if (method == HttpMethods.POST) {
      this.router.post(this.basePath + path, handler);
      return;
    }
    if (method == HttpMethods.PUT) {
      this.router.put(this.basePath + path, handler);
      return;
    }
    if (method == HttpMethods.PATCH) {
      this.router.patch(this.basePath + path, handler);
      return;
    }
    if (method == HttpMethods.DELETE) {
      this.router.delete(this.basePath + path, handler);
      return;
    }
  }

  private mount(): void {
    this.routesToMount.forEach(({ method, path, handler }) => {
      this.logger.log(`Mounting route for ${this.basePath}${path}`);
      this.define({
        method,
        path,
        handler,
      });
    });
  }

  public export(): R {
    this.mount();
    return this.router;
  }

  public abstract setupRoutes(): void;
}
