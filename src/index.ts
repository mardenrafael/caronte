import * as dotenv from "dotenv";
import { UserController } from "./controller/UserController";
import { ApplicationManager } from "./manager";
import { UserRouter } from "./router/userRouter";
import {
  HealthCheckRouter,
  HealthCheckController,
} from "./api/healthCheck";
import { Starter } from "./bin";

dotenv.config();

const starter = new Starter();

const applicationManager =
  ApplicationManager.getApplicationManagerInstance();

const userController = new UserController();
const userRouter = new UserRouter(userController);

const healthCheckController = new HealthCheckController();
const healthCheckRouter = new HealthCheckRouter(healthCheckController);

applicationManager.add(userRouter);
applicationManager.add(userController);
applicationManager.add(healthCheckRouter);
applicationManager.add(healthCheckController);

starter.start();
