import {showFullsize} from './fullsize.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

function buildMiniature(picture) {
  const miniature = template.cloneNode(true);
  const image = miniature.querySelector('.picture__img');

  image.setAttribute('src', picture.url);
  image.setAttribute('alt', picture.description);
  miniature.querySelector('.picture__comments').textContent = picture.comments.length;
  miniature.querySelector('.picture__likes').textContent = picture.likes;

  miniature.addEventListener('click', (evt) => {
    evt.preventDefault();
    showFullsize(picture);
  });

  return miniature;
}

function renderMiniatures(pictures) {
  const fragment = document.createDocumentFragment();

  container.querySelectorAll('.picture').forEach((miniature) => miniature.remove());

  for (const picture of pictures) {
    fragment.appendChild(buildMiniature(picture));
  }

  container.appendChild(fragment);
}

export {renderMiniatures};
