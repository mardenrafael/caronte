import * as dotenv from "dotenv";
import { Router } from "express";
import Application from "../Application";
import ApplicationManager from "../manager/ApplicationManager";

dotenv.config();

const app: Application = ApplicationManager.getInstance();

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
