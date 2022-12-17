import { createElement } from '../render';
import createEventItemTemplate from '../templates/event-Item-template';

export default class EventItemView {
  constructor({point, pointDestinations, currentOffers}) {
    this.data = {
      point,
      pointDestinations,
      currentOffers,
    };
  }

  getTemplate() {
    return createEventItemTemplate(this.data);
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
