// import { getRanomPoint } from '../mock/point';

import { mockPoints } from '../mock/point';
import { mockDestinations } from '../mock/destination';
import { mockOffers } from '../mock/offers';

export default class PointsModel {
  constructor (mockData) {
    this.mockData = mockData();
  }

  points = mockPoints;
  destinations = mockDestinations;
  offers = mockOffers;

  getData () {
    return this.mockData;
  }

  getPoints() {

    return this.points;
  }

  getDestinationData() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
