import * as dotenv from "dotenv";
import { Starter } from "./bin";
import { ApplicationManager } from "./manager";
import { RedisController, RedisRouter } from "./api/redis";

dotenv.config();

const starter = new Starter();

const applicationManager: ApplicationManager =
  ApplicationManager.getApplicationManagerInstance();

const redisController = new RedisController();
const redisRouter = new RedisRouter(redisController);

applicationManager.add(redisController);
applicationManager.add(redisRouter);

starter.start();
