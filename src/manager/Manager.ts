import Application from "../Application";

export default abstract class Manager<T> {
  private applicationInstance: Application | undefined;
  private readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public abstract setup(): void;
  public abstract mount(): void;
  public abstract add(item: T): void;

  public setApplication(application: Application): void {
    this.applicationInstance = application;
  }
  public getApplication(): Application {
    if (this.applicationInstance == null)
      throw new Error(
        "Application is not loaded properly on: " + this.name,
      );
    return this.applicationInstance;
  }
}
