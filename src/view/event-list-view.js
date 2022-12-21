import { createElement } from '../render';

function createEevntlistTemplate () {
  return '<ul class="trip-events__list">';
}

export default class EventListView {
  #element = null;

  get template() {
    return createEevntlistTemplate();
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
