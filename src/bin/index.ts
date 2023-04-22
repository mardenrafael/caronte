import * as dotenv from "dotenv";
import Application from "../Application";
import ApplicationManager from "../manager/ApplicationManager";
import UserRouter from "../router/userRouter/UserRouter";
import RouterManager from "../manager/RouterManager";

dotenv.config();

const applicationManager: ApplicationManager =
  ApplicationManager.getApplicationManagerInstance();

applicationManager.initializeApplication();

const app: Application = applicationManager.getApplicationInstance();
const routerManager: RouterManager = RouterManager.getInstance();

const userRouter = new UserRouter({
  basePath: "/user",
});

routerManager.add(userRouter);

routerManager.mountRoutes();
app.start();
