import { Router } from "express";
import { AbstractController } from "../../controller/AbstractController";
import Logger from "../../utils/Logger";

export type ApplicationRoute = {
  basePath: string;
  controller: AbstractController;
};

export enum HttpMethods {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

export type EndpointDescriptor = {
  method: HttpMethods;
  path: string;
  controller: AbstractController;
};

export default abstract class AbstractRouter {
  private readonly basePath: string;
  private readonly router: Router;
  private routesToMount: EndpointDescriptor[] = [];
  private readonly logger: Logger;
  protected readonly controller: AbstractController;

  constructor({ basePath, controller }: ApplicationRoute) {
    this.logger = new Logger();
    this.basePath = basePath;
    this.router = Router();
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

  private define({ controller, method, path }: EndpointDescriptor): void {
    if (controller.getHandlerListSize() != this.routesToMount.length) {
      throw new Error(
        `Controller list of ${controller.getName()} and route list of are of different sizes`,
      );
    }
    if (method == HttpMethods.GET) {
      this.router.get(this.basePath + path, controller.getHandler(method));
      return;
    }
    if (method == HttpMethods.POST) {
      this.router.post(
        this.basePath + path,
        controller.getHandler(method),
      );
      return;
    }
    if (method == HttpMethods.PUT) {
      this.router.put(this.basePath + path, controller.getHandler(method));
      return;
    }
    if (method == HttpMethods.PATCH) {
      this.router.patch(
        this.basePath + path,
        controller.getHandler(method),
      );
      return;
    }
    if (method == HttpMethods.DELETE) {
      this.router.delete(
        this.basePath + path,
        controller.getHandler(method),
      );
      return;
    }
  }

  private mount(): void {
    this.routesToMount.forEach(({ controller, method, path }) => {
      this.logger.log(`Mounting route for ${this.basePath}${path}`);
      this.define({
        controller,
        method,
        path,
      });
    });
  }

  public export(): Router {
    this.mount();

    return this.router;
  }

  public abstract setupRoutes(): void;
}
