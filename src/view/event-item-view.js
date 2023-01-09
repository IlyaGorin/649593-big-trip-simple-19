import AbstractView from '../framework/view/abstract-view';
import createEventItemTemplate from '../templates/event-Item-template';

export default class EventItemView extends AbstractView {
  #data = {};
  #handleRollUpButtonClick = null;

  constructor({
    point,
    pointDestinations,
    currentOffers,
    onRollUpButtonClick,
  }) {
    super();
    this.#data = {
      point,
      pointDestinations,
      currentOffers,
    };

    this.#handleRollUpButtonClick = onRollUpButtonClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpButtonClickHandler);
  }

  get template() {
    return createEventItemTemplate(this.#data);
  }

  #rollUpButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpButtonClick();
  };
}
