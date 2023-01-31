import { humanizePointDate, getDataForTemplate } from '../utils';
import { DateFormat, OFFERS_TYPE } from '../const';

export default function createEditEventFormTemplate (templateData) {
  const {
    point,
    currnetDestination,
    availableOffers,
    pointDestinations,
  } = getDataForTemplate(templateData);

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" src="img/icons/${point.type}.png" alt="Event type icon" width="17" height="17">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${OFFERS_TYPE.map((offer) => `
                <div class="event__type-item">
                  <input id="event-type-${offer}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer}" ${offer === point.type ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--${offer}" for="event-type-${offer}-1">${offer}</label>
                </div>
                `).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${point.id}">
            ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${currnetDestination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${pointDestinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDate(point.dateFrom, DateFormat.FORM)}">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDate(point.dateTo, DateFormat.FORM)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
      ${availableOffers !== undefined ? availableOffers.offers.map((offer, index) => {
      const isChecked = point.offers.includes(offer.id) ? 'checked' : '';

      return (
        `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${point.type}-${index}" type="checkbox" name="event-offer-${point.type}" ${isChecked}>
              <label class="event__offer-label" for="event-offer-${point.type}-${index}">
                <span class="event__offer-title">${offer.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`
      );
    }).join('') : '' }
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${currnetDestination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${currnetDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
}
