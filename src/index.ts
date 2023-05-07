import * as dotenv from "dotenv";
import { Starter } from "./bin";
import { Controller } from "./controller/Controller";
import { UserController } from "./controller/UserController";
import { ApplicationManager } from "./manager";
import { Router } from "./router/Router";
import { UserRouter } from "./router/userRouter";

dotenv.config();

const starter = new Starter();

const applicationManager: ApplicationManager =
  ApplicationManager.getApplicationManagerInstance();

const userController: Controller = new UserController();
const userRouter: Router = new UserRouter(userController);

applicationManager.add(userRouter);
applicationManager.add(userController);

starter.start();
