import AbstractView from '../framework/view/abstract-view';
import createNewPointFormTemplate from '../templates/new-point-form-template';
export default class NewPointFormView extends AbstractView {
  get template() {
    return createNewPointFormTemplate();
  }
}
