import e from "express";

export default interface HandlerDescriptor {
  handler: e.RequestHandler;
}
