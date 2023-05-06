import Application from "./Application";
import ApplicationManager from "../manager/ApplicationManager";
import Manager from "../manager/Manager";

export default class Starter {
  private readonly applicationManager: Manager<Application>;

  constructor() {
    this.applicationManager =
      ApplicationManager.getApplicationManagerInstance();
  }

  public start(): void {
    if (this.applicationManager instanceof ApplicationManager) {
      this.applicationManager.initApplication();
      this.applicationManager.config();
      this.applicationManager.setup();
      this.applicationManager.mount();
      this.applicationManager.load();
      this.applicationManager.start();
    } else {
      throw new Error("Error on start aplication");
    }
  }
}
