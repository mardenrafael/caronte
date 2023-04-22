import * as dotenv from "dotenv";
import Application from "../Application";
import ApplicationManager from "../manager/ApplicationManager";
import ControllerManager from "../manager/ControllerManager";
import RouterManager from "../manager/RouterManager";
import UserRouter from "../router/userRouter/UserRouter";
import { UserController } from "../controller/UserController";

dotenv.config();

const applicationManager: ApplicationManager =
  ApplicationManager.getApplicationManagerInstance();
const routerManager: RouterManager =
  RouterManager.getRouterManagerInstance();
const controllerManager: ControllerManager =
  ControllerManager.getControlllerManagerInstance();

const app: Application = applicationManager.getApplicationInstance();

const userController = new UserController();
const userRouter = new UserRouter({
  basePath: "/user",
  controller: userController,
});

routerManager.add(userRouter);
controllerManager.add(userController);

routerManager.setupRoute();
controllerManager.setupAllHandlers();
routerManager.mountRoutes();
app.start();
