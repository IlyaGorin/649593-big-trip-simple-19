import { render } from '../render';
import FiltersFormView from '../view/filters-form-view';
import NewPointFormView from '../view/new-point-form-view';
import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-item-view';
import EditEventFormView from '../view/edit-event-form-view';
import SortFormView from '../view/sort-form-view';

export default class TripEventsPresenter {
  filtersFormComponent = new FiltersFormView();
  sortFormComponent = new SortFormView();
  newPointFormComponent = new NewPointFormView();
  eventListComponent = new EventListView();

  constructor({tripEventsContainer, filtersFormContainer, pointsModel}){
    this.filtersFormContainer = filtersFormContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventsPoint = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinationData()];
    this.offers = [...this.pointsModel.getOffers()];
    this.mockData = this.pointsModel.getData();

    render(new FiltersFormView(), this.filtersFormContainer);
    render(this.sortFormComponent, this.tripEventsContainer);
    render(this.eventListComponent, this.tripEventsContainer);
    render(new EditEventFormView({point: this.mockData.points[0], pointDestinations: this.mockData.destinations, currentOffers: this.mockData.offers}), this.eventListComponent.getElement());

    for (let i = 1; i < this.eventsPoint.length; i++) {
      render(new EventItemView({point: this.mockData.points[i], pointDestinations: this.mockData.destinations, currentOffers: this.mockData.offers}), this.eventListComponent.getElement());
    }
  }
}
