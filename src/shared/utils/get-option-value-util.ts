export class GetOptionValueUtil {
  private constructor() {
    // Private constructor
  }

  public static getIfDefined<T>(originValue: T, ...newValues: (T | undefined)[]): T {
    newValues.reverse();
    const newValue = newValues.find(value => value !== undefined);
    return newValue !== undefined ? newValue : originValue;
  }
}
