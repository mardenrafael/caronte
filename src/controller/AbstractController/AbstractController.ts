import { RequestHandler } from "express";
import { HttpMethods } from "../../router/abstractRouter/AbstractRouter";

export type RequestHandlerDescriptor = {
  handler: RequestHandler;
  method: HttpMethods;
  parameters?: String;
};

export default abstract class AbstractController {
  private readonly definedHandlers: RequestHandlerDescriptor[];
  private readonly name: String;

  constructor(name: String) {
    this.definedHandlers = [];
    this.name = name;
  }

  public getHandler(method: HttpMethods): RequestHandler {
    let foundHandler;

    for (const handler of this.definedHandlers) {
      if (handler.method == method) {
        foundHandler = handler;
        break;
      }
    }

    if (!foundHandler) {
      throw new Error("Endpoint not available or does not exist");
    }

    return foundHandler.handler;
  }

  protected addHandler(
    requestHandlerDescriptor: RequestHandlerDescriptor,
  ): void {
    this.definedHandlers.push(requestHandlerDescriptor);
  }

  public getHandlerListSize(): Number {
    return this.definedHandlers.length;
  }

  public getName(): String {
    return this.name;
  }

  public abstract setupHandlers(): void;
}
