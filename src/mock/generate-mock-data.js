import { mockOffers } from './offers';
import { mockPoints } from './point';
import { mockDestinations } from './destination';

export default function generateMockData () {
  return {
    offers: [...mockOffers],
    points: [...mockPoints],
    destinations: [...mockDestinations],
  };
}
