import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import createEditEventFormTemplate from '../templates/edit-event-form-template';

export default class EditEventFormView extends AbstractStatefulView {
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
    this._setState(
      EditEventFormView.parseDataToState(
        point,
        pointDestinations,
        currentOffers
      )
    );
    this.#handleRollUpButtonClick = onRollUpButtonClick;
    this.#handleSaveButtonClick = onSaveButtonClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpButtonClickHandler);

    this.element.addEventListener('submit', this.#submitFormHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#pointTypeChangehandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpButtonClickHandler);

    this.element.addEventListener('submit', this.#submitFormHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#pointTypeChangehandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
  }

  #pointTypeChangehandler = (evt) => {
    evt.preventDefault();
    this._state.point.type = evt.target.value;
    this.updateElement(this._state);
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestiantion = this._state.pointDestinations.find(
      (destination) => destination.name === evt.target.value
    );
    this._state.point.destination = selectedDestiantion.id;
    this.updateElement(this._state);
  };

  #rollUpButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpButtonClick();
    EditEventFormView.parseDataToState(this._state);
  };

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveButtonClick();
    EditEventFormView.parseDataToState(this._state);
  };

  get template() {
    return createEditEventFormTemplate(this._state);
  }

  static parseDataToState(point, pointDestinations, currentOffers) {
    return {
      point,
      pointDestinations,
      currentOffers,
    };
  }

  static parseStateToData(state){
    const {point, pointDestinations, currentOffers } = state;

    return {
      point,
      pointDestinations,
      currentOffers,
    };
  }
}
