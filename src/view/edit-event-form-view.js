import AbstractView from '../framework/view/abstract-view';
import createEditEventFormTemplate from '../templates/edit-event-form-template';

export default class EditEventFormView extends AbstractView {
  #data = {};
  #handleRollUpButtonClick = null;
  #handleSaveButtonClick = null;

  constructor({
    point,
    pointDestinations,
    currentOffers,
    onRollUpButtonClick,
    onSaveButtonClick,
  }) {
    super();
    this.#data = {
      point,
      pointDestinations,
      currentOffers,
    };
    this.#handleRollUpButtonClick = onRollUpButtonClick;
    this.#handleSaveButtonClick = onSaveButtonClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpButtonClickHandler);

    this.element.addEventListener('submit', this.#submitFormHandler);
  }

  get template() {
    return createEditEventFormTemplate(this.#data);
  }

  #rollUpButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpButtonClick();
  };

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveButtonClick();
  };
}
