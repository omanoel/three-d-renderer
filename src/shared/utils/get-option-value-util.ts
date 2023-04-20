export class GetOptionValueUtil {
  private constructor() {
    // Private constructor
  }

  public static getIfDefined<T>(
    originValue: T,
    ...newValues: (T | undefined)[]
  ): T {
    newValues.reverse();
    const newValue = newValues.find((value) => value !== undefined);
    return newValue !== undefined ? newValue : originValue;
  }

  public static getFixedValue(value: number): string {
    return value.toFixed(2).replace(".00", "");
  }
}
