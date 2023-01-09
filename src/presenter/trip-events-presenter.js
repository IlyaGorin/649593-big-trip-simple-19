import { render, replace } from '../framework/render';
import FiltersFormView from '../view/filters-form-view';
import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-item-view';
import EditEventFormView from '../view/edit-event-form-view';
import SortFormView from '../view/sort-form-view';
import NoEventsView from '../view/no-events-view';

export default class TripEventsPresenter {
  #filtersFormComponent = new FiltersFormView();
  #sortFormComponent = new SortFormView();
  #eventListComponent = new EventListView();
  #noEventsComponent = new NoEventsView();
  #filtersFormContainer = null;
  #tripEventsContainer = null;
  #pointsModel = {};
  #mockData = {};

  constructor({ tripEventsContainer, filtersFormContainer, pointsModel }) {
    this.#filtersFormContainer = filtersFormContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  #renderEvent(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventItemView({
      point,
      pointDestinations: this.#mockData.destinations,
      currentOffers: this.#mockData.offers,
      onRollUpButtonClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const editEventFormComponent = new EditEventFormView({
      point,
      pointDestinations: this.#mockData.destinations,
      currentOffers: this.#mockData.offers,
      onRollUpButtonClick: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onSaveButtonClick: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToForm () {
      replace(editEventFormComponent, eventComponent);
    }

    function replaceFormToPoint () {
      replace(eventComponent, editEventFormComponent);
    }

    render(eventComponent, this.#eventListComponent.element);
  }

  #renderEventsList(data) {
    if (data.points.length === 0) {
      render(this.#filtersFormComponent, this.#filtersFormContainer);
      render(this.#noEventsComponent, this.#tripEventsContainer);
      return;
    }
    render(this.#filtersFormComponent, this.#filtersFormContainer);
    render(this.#sortFormComponent, this.#tripEventsContainer);
    render(this.#eventListComponent, this.#tripEventsContainer);

    for (let i = 0; i < data.points.length; i++) {
      const currentPoint = data.points[i];
      this.#renderEvent(currentPoint);
    }
  }

  init() {
    this.#mockData = this.#pointsModel.data;
    this.#renderEventsList(this.#mockData);
  }
}
