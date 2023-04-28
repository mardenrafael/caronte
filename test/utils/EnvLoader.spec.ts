import EnvLoader from "../../src/utils/EnvLoader";

describe("EnvLoader: ", () => {
  it("Deve lançar erro caso a key não exista", () => {
    expect(() => EnvLoader.load("")).toThrow();
  });
});
