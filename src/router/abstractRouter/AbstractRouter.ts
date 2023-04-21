import { RequestHandler, Router } from "express";

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
  handler: RequestHandler;
};

export default abstract class AbstractRouter {
  private readonly basePath: string;
  private readonly router: Router;
  private routesToMount: EndpointDescriptor[] = [];

  constructor({ basePath }: ApplicationRoute) {
    this.basePath = basePath;
    this.router = Router();
  }

  protected addEndpoint(endpointDescriptor: EndpointDescriptor): void {
    this.routesToMount.push(endpointDescriptor);
    console.log(
      `New route added to list 'Routes to mount' -> ${this.basePath}${endpointDescriptor.path}`,
    );
  }

  private define({ handler, method, path }: EndpointDescriptor): void {
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
    this.routesToMount.forEach(({ handler, method, path }) => {
      this.define({
        handler,
        method,
        path,
      });
    });

    console.log(`Mounting routes for ${this.basePath}`);
  }

  public export(): Router {
    this.setupRoutes();
    this.mount();

    return this.router;
  }

  protected abstract setupRoutes(): void;
}
