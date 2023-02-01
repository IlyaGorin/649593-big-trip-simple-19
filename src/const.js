const POINTS_COUNT = 3;

const DateFormat = {
  POINT: 'h:mm',
  FORM: 'DD/MM/YY h:mm',
  DAY: 'DD MMM YY',
};

const SortType = {
  DEFAULT: 'default',
  PRICE: 'price',
  DATE: 'date',
};

const OFFERS_TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export { POINTS_COUNT, DateFormat, SortType, OFFERS_TYPE };
