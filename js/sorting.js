import {debounce} from './timing.js';

const RANDOM_LIMIT = 10;
const RENDER_DELAY = 500;
const ACTIVE_CLASS = 'img-filters__button--active';

const filtersBlock = document.querySelector('.img-filters');
const filtersForm = filtersBlock.querySelector('.img-filters__form');

const sorters = {
  'filter-default': (pictures) => pictures,
  'filter-random': (pictures) => pictures
    .map((picture) => ({picture, order: Math.random()}))
    .sort((first, second) => first.order - second.order)
    .slice(0, RANDOM_LIMIT)
    .map((item) => item.picture),
  'filter-discussed': (pictures) => [...pictures]
    .sort((first, second) => second.comments.length - first.comments.length),
};

function setupSorting(pictures, render) {
  const renderDebounced = debounce((sorterId) => render(sorters[sorterId](pictures)), RENDER_DELAY);

  filtersBlock.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (!button || button.classList.contains(ACTIVE_CLASS)) {
      return;
    }

    filtersForm.querySelector(`.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS);
    button.classList.add(ACTIVE_CLASS);
    renderDebounced(button.id);
  });
}

export {setupSorting};
