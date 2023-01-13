import { render, replace, remove } from '../framework/render';
import EventItemView from '../view/event-item-view';
import EditEventFormView from '../view/edit-event-form-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #eventComponent = null;
  #editEventFormComponent = null;
  #data = null;
  #point = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ eventListContainer, data, onModeChange }) {
    this.#eventListContainer = eventListContainer;
    this.#data = data;
    this.#handleModeChange = onModeChange;
  }

  #replacePointToForm() {
    replace(this.#editEventFormComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#eventComponent, this.#editEventFormComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint.call(this);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  init(point) {
    this.#point = point;

    const prevEventComponent = this.#eventComponent;
    const prevEditEventFormComponent = this.#editEventFormComponent;

    this.#eventComponent = new EventItemView({
      point: this.#point,
      pointDestinations: this.#data.destinations,
      currentOffers: this.#data.offers,
      onRollUpButtonClick: () => {
        this.#replacePointToForm.call(this);
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
    });

    this.#editEventFormComponent = new EditEventFormView({
      point: this.#point,
      pointDestinations: this.#data.destinations,
      currentOffers: this.#data.offers,
      onRollUpButtonClick: () => {
        this.#replaceFormToPoint.call(this);
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onSaveButtonClick: () => {
        this.#replaceFormToPoint.call(this);
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
    });

    if (prevEventComponent === null || prevEditEventFormComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventFormComponent, prevEditEventFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventFormComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventFormComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }
}
