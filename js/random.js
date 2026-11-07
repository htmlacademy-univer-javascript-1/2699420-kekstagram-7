function getRandomNumber(from, to) {
  return Math.floor(from + Math.random() * (to - from + 1));
}

function pickRandom(list) {
  return list[getRandomNumber(0, list.length - 1)];
}

export {getRandomNumber, pickRandom};
