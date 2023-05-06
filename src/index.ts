import * as dotenv from "dotenv";
import { Starter } from "./bin";
import { UserController } from "./controller/UserController";
import { ApplicationManager } from "./manager";
import { UserRouter } from "./router/userRouter";

dotenv.config();

const starter = new Starter();

const applicationManager =
  ApplicationManager.getApplicationManagerInstance();

const userController = new UserController();
const userRouter = new UserRouter(userController);

applicationManager.add(userRouter);
applicationManager.add(userController);

starter.start();
