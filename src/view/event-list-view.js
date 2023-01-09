import AbstractView from '../framework/view/abstract-view';

function createEevntlistTemplate () {
  return '<ul class="trip-events__list">';
}

export default class EventListView extends AbstractView {
  get template() {
    return createEevntlistTemplate();
  }
}
