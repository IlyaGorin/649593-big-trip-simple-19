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
  editEventFormComponent = new EditEventFormView();

  constructor({tripEventsContainer, filtersFormContainer}){
    this.filtersFormContainer = filtersFormContainer;
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new FiltersFormView(), this.filtersFormContainer); // Фильтры
    render(this.sortFormComponent, this.tripEventsContainer); // Форма сортировки
    render(this.eventListComponent, this.tripEventsContainer); // Список ивентов

    // Заполняем список
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        render(this.newPointFormComponent, this.eventListComponent.getElement()); // Форма создания нового ивента
        continue;
      }

      if(i === 2) {
        render(this.editEventFormComponent, this.eventListComponent.getElement());
        continue;
      }

      render(new EventItemView, this.eventListComponent.getElement());
    }
  }
}
