import Application from "../Application";

export default class ApplicationManager {
  private static instance: Application;

  public static getInstance(): Application {
    if (!this.instance) {
      this.instance = new Application();
    }

    return this.instance;
  }
}
