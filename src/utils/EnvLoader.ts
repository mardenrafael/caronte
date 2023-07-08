export default class EnvLoader {
  public static load(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      console.error(`Missing required env var ${key}`);
      throw new Error();
    }
    return value;
  }
}
