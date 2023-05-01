import { Application } from "../../src/bin";
import { UserController } from "../../src/controller/UserController";
import {
  ApplicationManager,
  ControllerManager,
  Manager,
  RouterManager,
} from "../../src/manager";
import UserRouter from "../../src/router/userRouter/UserRouter";

describe("ApplicationManager: ", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "development";

    const manager = ApplicationManager.getApplicationManagerInstance();

    manager.setIsInitialized(false);
  });

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
    manager.getApplicationInstance();
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

  it("Deve conter router manager", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();

    expect(manager.getRouterManager()).toBeDefined();
    expect(manager.getRouterManager()).toBeInstanceOf(Manager);
  });

  it("Chamando o método add com Router o routerManager.add deve ser chamado", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();
    const userRouterFake = new UserRouter(new UserController());

    const routerManager = manager.getRouterManager() as RouterManager;
    const sizeBefore = routerManager.getManaged().length;

    manager.add(userRouterFake);

    expect(routerManager.getManaged().length).toBeGreaterThan(sizeBefore);
  });

  it("Chamando o método add com Controller o controllerManager.add deve ser chamado", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();
    const userControllerFake = new UserController();

    const controllerManager =
      manager.getControllerManager() as ControllerManager;
    const sizeBefore = controllerManager.getManaged().length;

    manager.add(userControllerFake);

    expect(controllerManager.getManaged().length).toBeGreaterThan(
      sizeBefore,
    );
  });

  it("Start deve lançar erro caso seja chamado antes de inicializar", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();
    manager.setIsInitialized(false);

    expect(() => manager.start()).toThrow();
  });

  it("DevMode deve ser falso caso NODE_ENV seja diferente de development", () => {
    process.env.NODE_ENV = "prod";

    const manager = ApplicationManager.getApplicationManagerInstance();
    manager.getApplicationInstance();
    manager.setIsConfig(false);
    manager.config();

    expect(manager.isDevMode()).toBeFalsy();
  });

  it("DevMode deve ser verdadeiro caso NODE_ENV seja igual development", () => {
    process.env.NODE_ENV = "development";
    const manager = ApplicationManager.getApplicationManagerInstance();
    manager.getApplicationInstance();
    manager.setIsConfig(false);
    manager.config();

    expect(manager.isDevMode()).toBeTruthy();
  });

  it("Config deve retornar undefined caso isConfig seja verdadeiro", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();
    manager.setIsConfig(true);

    expect(manager.config()).toBe(undefined);
  });

  it("Mount deve ser chamado 1 vez", () => {
    const mockMethod = jest.fn().mockImplementation(() => {
      return;
    });

    const manager = ApplicationManager.getApplicationManagerInstance();
    const routerManager = manager.getRouterManager();

    routerManager.mount = mockMethod;

    manager.mount();

    expect(mockMethod).toBeCalledTimes(1);
  });

  it("Setup deve ser chamado 2 vez", () => {
    const mockMethod = jest.fn().mockImplementation(() => {
      return;
    });

    const manager = ApplicationManager.getApplicationManagerInstance();
    const routerManager = manager.getRouterManager();
    const controllerManager = manager.getControllerManager();

    routerManager.setup = mockMethod;
    controllerManager.setup = mockMethod;

    manager.setup();

    expect(mockMethod).toBeCalledTimes(2);
  });

  it("Start deve ser chamado 1 vez", () => {
    const mockMethod = jest.fn().mockImplementation(() => {
      return;
    });

    const manager = ApplicationManager.getApplicationManagerInstance();
    const application = manager.getApplicationInstance();

    application.start = mockMethod;

    manager.start();

    expect(mockMethod).toBeCalled();
  });

  it("Config deve lançar erro quando isInitialized for falso", () => {
    const manager = ApplicationManager.getApplicationManagerInstance();

    manager.setIsConfig(false);
    manager.setIsInitialized(false);

    expect(() => manager.config()).toThrow();
  });
});
