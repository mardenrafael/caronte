import { Request, RequestHandler, Response } from "express";
import { HttpMethods } from "../../router/abstractRouter/AbstractRouter";

export type RequestHandlerDescriptor = {
  handlerKey: PropertyKey;
  handler: RequestHandler;
  method: HttpMethods;
  parameters?: String;
};

export default abstract class AbstractController {
  public abstract handler(req: Request, res: Response): Promise<void>;
}
