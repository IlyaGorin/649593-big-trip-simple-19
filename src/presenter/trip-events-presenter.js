import { render } from '../render';
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

  constructor({tripEventsContainer, filtersFormContainer, pointsModel}){
    this.#filtersFormContainer = filtersFormContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  #renderEvent (point) {
    const eventComponent = new EventItemView({
      point,
      pointDestinations: this.#mockData.destinations,
      currentOffers: this.#mockData.offers
    });

    const editEventFormComponent = new EditEventFormView({
      point,
      pointDestinations: this.#mockData.destinations,
      currentOffers: this.#mockData.offers
    });

    const replacePointToForm = () => {
      this.#eventListComponent.element.replaceChild(editEventFormComponent.element, eventComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#eventListComponent.element.replaceChild(eventComponent.element, editEventFormComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editEventFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    editEventFormComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(eventComponent, this.#eventListComponent.element);
  }

  #renderEventsList (data) {
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
