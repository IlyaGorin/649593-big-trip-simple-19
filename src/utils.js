import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDate(date, dateFormat) {
  return dayjs(date).format(dateFormat);
}

function getDataForTemplate(data) {
  const { point, pointDestinations, currentOffers } = data;
  const { destination, type } = point;
  const currnetDestination = pointDestinations.find(
    (pointDestination) => pointDestination.id === destination
  );
  const availableOffers = currentOffers.find((offer) => offer.type === type);

  return {
    pointDestinations,
    point,
    currnetDestination,
    availableOffers,
  };
}

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortPointsUp(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPriceDown(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {
  getRandomArrayElement,
  humanizePointDate,
  getDataForTemplate,
  sortPointsUp,
  sortPriceDown,
};
