export default class RandomId {
  static getId(length: number) {
    return Math.round(Math.random() * length) || 1;
  }
}
