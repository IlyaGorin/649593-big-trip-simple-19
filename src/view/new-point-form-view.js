import { createElement } from '../render';
import createNewPointFormTemplate from '../templates/new-point-form-template';
export default class NewPointFormView {
  getTemplate() {
    return createNewPointFormTemplate();
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
