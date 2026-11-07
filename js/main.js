const PICTURE_COUNT = 25;
const Likes = {
  MIN: 15,
  MAX: 200,
};
const Comments = {
  MIN: 0,
  MAX: 30,
};
const AVATAR_COUNT = 6;

const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHORS = ['Полина', 'Никита', 'Вера', 'Егор', 'Софья', 'Максим', 'Даша', 'Лев', 'Катя', 'Тимур'];

const PHOTO_CAPTIONS = [
  'Наконец-то выбрались на природу',
  'Лучший завтрак за неделю',
  'Собака увидела снег впервые',
  'Вечерний город с крыши',
  'Новая книга и плед',
  'Поездка на море, день третий',
  'Цветы у бабушки на даче',
  'Ночь перед экзаменом',
];

function getRandomNumber(from, to) {
  return Math.floor(from + Math.random() * (to - from + 1));
}

function pickRandom(list) {
  return list[getRandomNumber(0, list.length - 1)];
}

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

generatePictures();
