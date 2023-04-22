import { Router } from "express";
import { AbstractController } from "../../controller/AbstractController";
import Logger from "../../utils/Logger";

export type ApplicationRoute = {
  basePath: string;
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

  constructor({ basePath }: ApplicationRoute) {
    this.logger = new Logger();
    this.basePath = basePath;
    this.router = Router();
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
    if (method == HttpMethods.GET) {
      this.router.get(this.basePath + path, controller.handler);
      return;
    }
    if (method == HttpMethods.POST) {
      this.router.post(this.basePath + path, controller.handler);
      return;
    }
    if (method == HttpMethods.PUT) {
      this.router.put(this.basePath + path, controller.handler);
      return;
    }
    if (method == HttpMethods.PATCH) {
      this.router.patch(this.basePath + path, controller.handler);
      return;
    }
    if (method == HttpMethods.DELETE) {
      this.router.delete(this.basePath + path, controller.handler);
      return;
    }
  }

  private mount(): void {
    this.routesToMount.forEach(({ controller: handler, method, path }) => {
      this.logger.log(`Mounting route for ${this.basePath}${path}`);
      this.define({
        controller: handler,
        method,
        path,
      });
    });
  }

  public export(): Router {
    this.setupRoutes();
    this.mount();

    return this.router;
  }

  protected abstract setupRoutes(): void;
}
