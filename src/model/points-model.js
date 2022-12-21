export default class PointsModel {
  #mockData = {};

  constructor (mockData) {
    this.#mockData = mockData();
  }

  get data () {
    return this.#mockData;
  }
}
