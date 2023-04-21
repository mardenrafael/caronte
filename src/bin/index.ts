import * as dotenv from "dotenv";
import Application from "../Application";
import ApplicationManager from "../manager/ApplicationManager";
import UserRouter from "../router/userRouter/UserRouter";
import RouterManager from "../manager/RouterManager";

dotenv.config();

const applicationManager: ApplicationManager =
  ApplicationManager.getApplicationInstance();

applicationManager.initializeApplication();

const app: Application = applicationManager.getApplication();
const routerManager: RouterManager = RouterManager.getInstance();

const userRouter = new UserRouter({
  basePath: "/",
});

routerManager.add(userRouter);

routerManager.mountRoutes();
app.start();
