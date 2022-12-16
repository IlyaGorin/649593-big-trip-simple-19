import { humanizePointDate, getTemplateData } from '../utils';
import { DATE_FORMAT } from '../const';

export default function createEventItemTemplate (templateData) {
  const {point, currnetDestination, availableOffers} = getTemplateData(templateData);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">MAR 18</time>
        <div class="event__type">
          <img class="event__type-icon" src="img/icons/${point.type}.png" alt="Event type icon" width="42" height="42">
        </div>
        <h3 class="event__title">${point.type} ${currnetDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${humanizePointDate(point.dateFrom, DATE_FORMAT.POINT)}</time>
            —
            <time class="event__end-time" datetime="2019-03-18T11:00">${humanizePointDate(point.dateTo, DATE_FORMAT.POINT)}</time>
          </p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${point.basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${availableOffers !== undefined ? availableOffers.offers.map((offer)=> `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`
    ).join('') : '<li class="event__offer"><span class="event__offer-title">No additional offers</span></li>'}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}
