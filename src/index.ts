import * as dotenv from "dotenv";
import { Resource, Starter } from "./bin";
import { UserController } from "./controller/UserController";
import { ResourceManager } from "./manager";
import { UserRouter } from "./router/userRouter";

dotenv.config();

const starter = new Starter();

const userResource: Resource = new Resource();

userResource.setController(new UserController());
userResource.setRouter(new UserRouter());

ResourceManager.getResourceManagerInstance().add(userResource);

starter.start();
