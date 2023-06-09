import { HttpMethods } from "../../enum/HttpMethods";
import { HandlerDescriptor } from "../../descriptor/handlerDescriptor";

export type RequestHandlerDescriptor = {
  handlerDescriptor: HandlerDescriptor;
  method: HttpMethods;
  handlerName: String;
  parameters?: String;
};

export default abstract class Controller {
  private readonly definedHandlers: RequestHandlerDescriptor[];
  private readonly name: String;

  constructor(name: String) {
    this.definedHandlers = [];
    this.name = name;
  }

  public getHandler(method: HttpMethods): HandlerDescriptor {
    let foundHandler;

    for (const handler of this.definedHandlers) {
      if (handler.method == method) {
        foundHandler = handler;
        break;
      }
    }

    if (!foundHandler) {
      throw new Error("Handler not available or does not exist");
    }

    return foundHandler.handlerDescriptor;
  }

  public getHandlerByName(handlerName: String): HandlerDescriptor {
    let foundHandler;

    for (const handlerDescriptor of this.definedHandlers) {
      if (handlerDescriptor.handlerName == handlerName) {
        foundHandler = handlerDescriptor;
        break;
      }
    }

    if (!foundHandler) {
      throw new Error("Handler not available or does not exist");
    }

    return foundHandler.handlerDescriptor;
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

  public getDefinedHandlers(): RequestHandlerDescriptor[] {
    return this.definedHandlers;
  }

  public abstract setupHandlers(): void;
}
