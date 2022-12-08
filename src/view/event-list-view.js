import { createElement } from '../render';

function createEevntlistTemplate () {
  return '<ul class="trip-events__list">';
}

export default class EventListView {
  getTemplate() {
    return createEevntlistTemplate();
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
