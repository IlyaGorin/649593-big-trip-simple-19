import { render } from '../framework/render';
import { SortType } from '../const';
import { sortPointsUp, sortPriceDown } from '../utils';
import FiltersFormView from '../view/filters-form-view';
import EventListView from '../view/event-list-view';
import SortFormView from '../view/sort-form-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';

export default class TripItineraryPresenter {
  #filtersFormComponent = new FiltersFormView();
  #eventListComponent = new EventListView();
  #noEventsComponent = new NoEventsView();
  #sortFormComponent = null;
  #filtersFormContainer = null;
  #tripEventsContainer = null;
  #pointsModel = {};
  #mockData = {};
  #eventPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedPoints = [];

  constructor({ tripEventsContainer, filtersFormContainer, pointsModel }) {
    this.#filtersFormContainer = filtersFormContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#mockData.points.sort(sortPointsUp);
        break;
      case SortType.PRICE:
        this.#mockData.points.sort(sortPriceDown);
        break;
      default:
        this.#mockData.points = [...this.#sourcedPoints];
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (sortType === undefined) {
      return;
    }

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEventsList(this.#mockData);
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
    this.#sortFormComponent = new SortFormView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortFormComponent, this.#tripEventsContainer);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventsList(data) {
    render(this.#eventListComponent, this.#tripEventsContainer);

    for (let i = 0; i < data.points.length; i++) {
      const currentPoint = data.points[i];
      this.#renderEvent(currentPoint, data);
    }
  }

  #renderTripItinerary(data) {
    if (data.points.length === 0) {
      this.#renderNoEvents();
      this.#renderFiltersForm();
      return;
    }

    this.#renderFiltersForm();
    this.#renderSortForm();
    this.#renderEventsList(data);
  }

  init() {
    this.#mockData = this.#pointsModel.data;
    this.#sourcedPoints = this.#pointsModel.data.points.sort(sortPointsUp);
    this.#renderTripItinerary(this.#mockData);
  }
}
