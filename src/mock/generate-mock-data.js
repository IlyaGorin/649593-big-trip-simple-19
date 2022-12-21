import { MOCK_OFFERS } from './offers';
import { MOCK_POINTS } from './points';
import { MOCK_DESTINATIONS } from './destination';

export default function generateMockData () {
  return {
    offers: [...MOCK_OFFERS],
    points: [...MOCK_POINTS],
    destinations: [...MOCK_DESTINATIONS],
  };
}
