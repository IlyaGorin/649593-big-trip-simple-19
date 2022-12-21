import { createElement } from '../render';
import createEventItemTemplate from '../templates/event-Item-template';

export default class EventItemView {
  #element = null;
  #data = {};

  constructor({point, pointDestinations, currentOffers}) {
    this.#data = {
      point,
      pointDestinations,
      currentOffers,
    };
  }

  get template() {
    return createEventItemTemplate(this.#data);
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
