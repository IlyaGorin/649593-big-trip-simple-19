import { createElement } from '../render';
import createEditEventFormTemplate from '../templates/edit-event-form-template';

export default class EditEventFormView {
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
    return createEditEventFormTemplate(this.#data);
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
