import TripEventsPresenter from './presenter/trip-events-presenter';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: siteTripEventsElement,
  filtersFormContainer: siteFiltersElement,
});

tripEventsPresenter.init();
