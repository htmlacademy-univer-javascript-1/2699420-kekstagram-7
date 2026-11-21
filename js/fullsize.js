const AVATAR_SIZE = 35;

const fullsize = document.querySelector('.big-picture');
const fullsizeImage = fullsize.querySelector('.big-picture__img img');
const fullsizeLikes = fullsize.querySelector('.likes-count');
const fullsizeCommentsTotal = fullsize.querySelector('.comments-count');
const fullsizeCaption = fullsize.querySelector('.social__caption');
const commentsList = fullsize.querySelector('.social__comments');
const commentsCounter = fullsize.querySelector('.social__comment-count');
const commentsLoader = fullsize.querySelector('.comments-loader');
const closeButton = fullsize.querySelector('#picture-cancel');

function buildComment(comment) {
  const item = document.createElement('li');
  const avatar = document.createElement('img');
  const text = document.createElement('p');

  item.className = 'social__comment';
  avatar.className = 'social__picture';
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = AVATAR_SIZE;
  avatar.height = AVATAR_SIZE;
  text.className = 'social__text';
  text.textContent = comment.message;

  item.append(avatar, text);
  return item;
}

function fillComments(comments) {
  commentsList.innerHTML = '';
  comments.forEach((comment) => commentsList.appendChild(buildComment(comment)));
}

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideFullsize();
  }
}

function hideFullsize() {
  fullsize.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

function showFullsize(picture) {
  fullsizeImage.src = picture.url;
  fullsizeLikes.textContent = picture.likes;
  fullsizeCommentsTotal.textContent = picture.comments.length;
  fullsizeCaption.textContent = picture.description;
  fillComments(picture.comments);

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  fullsize.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

closeButton.addEventListener('click', hideFullsize);

export {showFullsize};
