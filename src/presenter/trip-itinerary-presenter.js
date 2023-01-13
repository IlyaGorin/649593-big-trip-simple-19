import { render } from '../framework/render';
import FiltersFormView from '../view/filters-form-view';
import EventListView from '../view/event-list-view';
import SortFormView from '../view/sort-form-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';

export default class TripItineraryPresenter {
  #filtersFormComponent = new FiltersFormView();
  #sortFormComponent = new SortFormView();
  #eventListComponent = new EventListView();
  #noEventsComponent = new NoEventsView();
  #filtersFormContainer = null;
  #tripEventsContainer = null;
  #pointsModel = {};
  #mockData = {};
  #eventPresenters = new Map();

  constructor({ tripEventsContainer, filtersFormContainer, pointsModel }) {
    this.#filtersFormContainer = filtersFormContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEvent(point, data) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      data,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(point);
    this.#eventPresenters.set(point.id, eventPresenter);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#tripEventsContainer);
  }

  #renderFiltersForm() {
    render(this.#filtersFormComponent, this.#filtersFormContainer);
  }

  #renderSortForm() {
    render(this.#sortFormComponent, this.#tripEventsContainer);
  }

  #renderTripItinerary(data) {
    if (data.points.length === 0) {
      this.#renderNoEvents();
      this.#renderFiltersForm();
      return;
    }

    this.#renderFiltersForm();
    this.#renderSortForm();
    render(this.#eventListComponent, this.#tripEventsContainer);

    for (let i = 0; i < data.points.length; i++) {
      const currentPoint = data.points[i];
      this.#renderEvent(currentPoint, data);
    }
  }

  init() {
    this.#mockData = this.#pointsModel.data;
    this.#renderTripItinerary(this.#mockData);
  }
}
