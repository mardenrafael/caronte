import { Resource } from "../bin";
import Manager from "./Manager";

export default class ResourceManager extends Manager<Resource> {
  private static instance: ResourceManager;

  private constructor() {
    super(ResourceManager.name);
  }

  public static getResourceManagerInstance(): ResourceManager {
    if (this.instance == undefined) {
      this.instance = new ResourceManager();
    }

    return this.instance;
  }

  public override load(): void {}
  public override setup(): void {
    this.managed.forEach(resource => {
      resource.setupResource();
    });
  }

  public override add(item: Resource): void {
    this.managed.push(item);
  }
  public override mount(): void {}
}
