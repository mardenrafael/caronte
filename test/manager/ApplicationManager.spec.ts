import Application from "../../src/Application";
import ApplicationManager from "../../src/manager/ApplicationManager";

describe("ApplicationManager: ", () => {
  it("Deve retornar uma instance de ApplicationManager", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();

    expect(manager).toBeInstanceOf(ApplicationManager);
  });

  it("Deve retornar uma instancia da aplicação", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();
    const application = manager.getApplicationInstance();

    expect(application).toBeInstanceOf(Application);
  });
});
