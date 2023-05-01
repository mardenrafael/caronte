import * as dotenv from "dotenv";
import { UserController } from "./controller/UserController";
import ApplicationManager from "./manager/ApplicationManager";
import UserRouter from "./router/userRouter/UserRouter";
import HealthCheckController from "./api/healthCheck/HealthCheckController";
import HealthCheckRouter from "./api/healthCheck/HealthCheckRouter";
import Starter from "./bin/Starter";

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
