import { RenderPosition } from './const';

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  // console.log(component, container);
  container.insertAdjacentElement(place, component.element);
}

export {createElement, render};
