import morgan from "morgan";
import Application from "./Application";
import ApplicationManager from "./manager/ApplicationManager";
import { Router, json } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app: Application = ApplicationManager.getInstance();

app.use(json());
app.use(morgan("dev"));

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "ok",
  });
});

app.addRoute({
  path: "/",
  routeDescriptor: {
    method: "GET",
    route: router,
  },
});

app.start();
