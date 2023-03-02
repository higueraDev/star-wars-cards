export default class FormatNumber {
  public static formatStringToNumber(value: string) {
    const numberValue = Number(value);
    const formattedValue = Number.isNaN(numberValue)
      ? '-'
      : numberValue.toLocaleString('en-US');
    return formattedValue;
  }
  public static formatFeatString(value: string) {
    return Number(value.replace(',', '')) || 0;
  }
}
