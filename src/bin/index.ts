import * as dotenv from "dotenv";
import { UserController } from "../controller/UserController";
import ApplicationManager from "../manager/ApplicationManager";
import UserRouter from "../router/userRouter/UserRouter";

dotenv.config();

const applicationManager: ApplicationManager =
  ApplicationManager.getApplicationManagerInstance();

const userController = new UserController();
const userRouter = new UserRouter({
  basePath: "/user",
  controller: userController,
});

applicationManager.add(userRouter);
applicationManager.add(userController);
applicationManager.initApplication();
applicationManager.config();
applicationManager.setup();
applicationManager.mount();
applicationManager.load();
applicationManager.start();
