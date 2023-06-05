import { Router as R } from "express";
import { Controller } from "../../controller/Controller";
import Logger from "../../utils/Logger";
import { HttpMethods } from "../../enum/HttpMethods";
import { HandlerDescriptor } from "../../descriptor/handlerDescriptor";

export type ApplicationRouter = {
  basePath: string;
};

export type EndpointDescriptor = {
  method: HttpMethods;
  path: string;
  handlerDescriptor: HandlerDescriptor;
};

export default abstract class Router {
  private readonly basePath: string;
  private readonly router: R;
  private routesToMount: EndpointDescriptor[] = [];
  private readonly logger: Logger;
  protected controller!: Controller;

  constructor({ basePath }: ApplicationRouter) {
    this.logger = new Logger();
    this.basePath = basePath;
    this.router = R();
  }

  protected addEndpoint(endpointDescriptor: EndpointDescriptor): void {
    this.routesToMount.push(endpointDescriptor);
    this.logger.log(
      `New route added to list 'Routes to mount' -> ${
        HttpMethods[endpointDescriptor.method]
      } ${this.basePath}${endpointDescriptor.path}`,
    );
  }

  private define({
    method,
    path,
    handlerDescriptor,
  }: EndpointDescriptor): void {
    if (method == HttpMethods.GET) {
      this.router.get(this.basePath + path, handlerDescriptor.handler);
      return;
    }
    if (method == HttpMethods.POST) {
      this.router.post(this.basePath + path, handlerDescriptor.handler);
      return;
    }
    if (method == HttpMethods.PUT) {
      this.router.put(this.basePath + path, handlerDescriptor.handler);
      return;
    }
    if (method == HttpMethods.PATCH) {
      this.router.patch(this.basePath + path, handlerDescriptor.handler);
      return;
    }
    if (method == HttpMethods.DELETE) {
      this.router.delete(this.basePath + path, handlerDescriptor.handler);
      return;
    }
  }

  private mount(): void {
    this.routesToMount.forEach(({ method, path, handlerDescriptor }) => {
      this.logger.log(`Mounting route for ${this.basePath}${path}`);
      this.define({
        method,
        path,
        handlerDescriptor,
      });
    });
  }

  public export(): R {
    this.mount();
    return this.router;
  }

  public abstract setupRoutes(): void;

  public setController(controller: Controller): void {
    this.controller = controller;
  }
}
