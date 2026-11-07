function isLengthValid(text, limit) {
  return text.length <= limit;
}

function checkPalindrome(text) {
  const cleanText = text.toUpperCase().replaceAll(' ', '');
  let left = 0;
  let right = cleanText.length - 1;

  while (left < right) {
    if (cleanText.at(left) !== cleanText.at(right)) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

function getDigits(input) {
  const source = String(input);
  let result = '';

  for (const char of source) {
    const digit = parseInt(char, 10);
    if (!Number.isNaN(digit)) {
      result += digit;
    }
  }

  return parseInt(result, 10);
}

function parseTime(time) {
  const parts = time.split(':').map(Number);
  return parts[0] * 60 + parts[1];
}

function fitsWorkingDay(workStart, workEnd, meetingStart, duration) {
  const start = parseTime(meetingStart);
  const end = start + duration;

  if (start < parseTime(workStart)) {
    return false;
  }

  return end <= parseTime(workEnd);
}

isLengthValid('проверяемая строка', 18);
checkPalindrome('ДовОд');
getDigits('агент 007');
fitsWorkingDay('8:0', '10:0', '8:0', 120);
