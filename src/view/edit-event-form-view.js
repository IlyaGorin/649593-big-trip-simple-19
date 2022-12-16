import { createElement } from '../render';
import createEditEventFormTemplate from '../templates/edit-event-form-template';
export default class EditEventFormView {
  constructor({point, pointDestinations, currentOffers}) {
    this.data = {
      point,
      pointDestinations,
      currentOffers,
    };
  }

  getTemplate() {
    return createEditEventFormTemplate(this.data);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
