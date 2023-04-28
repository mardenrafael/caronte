export default class EnvLoader {
  public static load(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Missing required env var ${key}`);
    }
    return value;
  }
}
