import Application from "../../src/Application";
import ApplicationManager from "../../src/manager/ApplicationManager";
import Manager from "../../src/manager/Manager";

describe("ApplicationManager: ", () => {
  it("Deve retornar uma instance de ApplicationManager", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();

    expect(manager).toBeInstanceOf(Manager);
  });

  it("Deve retornar uma instancia da aplicação", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();
    const application = manager.getApplicationInstance();

    expect(application).toBeInstanceOf(Application);
  });

  it("Deve conter atributo port e host como undefined quando isConfig é false", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();

    expect(manager.isConfig()).toBeFalsy();
    expect(manager.getHost()).toBeUndefined();
    expect(manager.getPort()).toBeUndefined();
  });

  it("Deve conter atributo port e host quando isConfig é true", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();

    manager.config();

    expect(manager.isConfig()).toBeTruthy();
    expect(manager.getHost()).toBeDefined();
    expect(manager.getPort()).toBeDefined();
  });

  it("Deve conter controller manager", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();

    expect(manager.getControllerManager()).toBeDefined();
    expect(manager.getControllerManager()).toBeInstanceOf(Manager);
  });
});
