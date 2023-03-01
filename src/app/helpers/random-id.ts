export default class RandomNumber {
  static getNumber(length: number) {
    return Math.round(Math.random() * length) || 1;
  }
}
