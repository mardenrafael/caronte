import * as dotenv from "dotenv";
import Application from "../Application";
import ApplicationManager from "../manager/ApplicationManager";
import UserRouter from "../router/userRouter/UserRouter";
import RouterManager from "../manager/RouterManager";

dotenv.config();

const app: Application = ApplicationManager.getInstance();
const routerManager: RouterManager = RouterManager.getInstance();

const userRouter = new UserRouter({
  basePath: "/",
});

routerManager.add(userRouter);

routerManager.mountRoutes();
app.start();
