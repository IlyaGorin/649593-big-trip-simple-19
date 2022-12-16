import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDate(date, dateFormat) {
  return dayjs(date).format(dateFormat);
}

function getTemplateData(data) {
  const {point, pointDestinations, currentOffers} = data;
  const {destination, type} = point;
  const currnetDestination = pointDestinations.find((pointDestination) => pointDestination.id === destination);
  const availableOffers = currentOffers.find((offer) => offer.type === type);

  return {
    point,
    currnetDestination,
    availableOffers,
  };
}

export {getRandomArrayElement , humanizePointDate, getTemplateData};
