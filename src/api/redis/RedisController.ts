import { createClient } from "redis";
import { Request, Response } from "express";
import { Controller } from "../../controller/Controller";
import { HttpMethods } from "../../enum/HttpMethods";

export default class RedisController extends Controller {
  constructor() {
    super(RedisController.name);
  }

  private async getKey(_req: Request, res: Response): Promise<void> {
    const client = createClient({
      url: "redis://redis:6379",
    });

    client.on("error", e => {
      console.log(`Redis client error ${e}`);
    });

    await client.connect();

    await client.set("key-test", "teste001");

    const key: string = "key-test";
    let value: string | null = "";

    value = await client.get("key-test");

    res.status(200).json({
      message: {
        key,
        value: value ? value : "Not found",
      },
    });

    await client.disconnect();
  }

  public override setupHandlers(): void {
    this.addHandler({
      method: HttpMethods.GET,
      handlerName: "getKey",
      handlerDescriptor: {
        handler: this.getKey,
      },
    });
  }
}
