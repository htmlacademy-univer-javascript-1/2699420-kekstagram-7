import {getRandomNumber, pickRandom} from './random.js';
import {
  PICTURE_COUNT,
  AVATAR_COUNT,
  Likes,
  Comments,
  COMMENT_LINES,
  AUTHORS,
  PHOTO_CAPTIONS,
} from './constants.js';

let commentCounter = 0;

function buildCommentText() {
  const first = pickRandom(COMMENT_LINES);
  if (Math.random() < 0.5) {
    return first;
  }
  const rest = COMMENT_LINES.filter((line) => line !== first);
  return `${first} ${pickRandom(rest)}`;
}

function buildComment() {
  commentCounter++;
  return {
    id: commentCounter,
    avatar: `img/avatar-${getRandomNumber(1, AVATAR_COUNT)}.svg`,
    message: buildCommentText(),
    name: pickRandom(AUTHORS),
  };
}

function buildPicture(id) {
  const comments = [];
  const commentsAmount = getRandomNumber(Comments.MIN, Comments.MAX);

  for (let i = 0; i < commentsAmount; i++) {
    comments.push(buildComment());
  }

  return {
    id,
    url: `photos/${id}.jpg`,
    description: pickRandom(PHOTO_CAPTIONS),
    likes: getRandomNumber(Likes.MIN, Likes.MAX),
    comments,
  };
}

function generatePictures() {
  const pictures = [];
  for (let i = 1; i <= PICTURE_COUNT; i++) {
    pictures.push(buildPicture(i));
  }
  return pictures;
}

export {generatePictures};
