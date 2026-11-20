const HashtagRule = {
  MAX_COUNT: 5,
  MAX_LENGTH: 20,
  PATTERN: /^#[a-zа-яё0-9]+$/i,
};

const DESCRIPTION_MAX_LENGTH = 140;

const uploadForm = document.querySelector('#upload-select-image');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'text__error',
});

let hashtagsError = '';

function splitHashtags(value) {
  return value.split(' ').filter((item) => item !== '');
}

function checkHashtags(value) {
  const hashtags = splitHashtags(value);
  const seen = [];

  hashtagsError = '';

  if (hashtags.length > HashtagRule.MAX_COUNT) {
    hashtagsError = `Не больше ${HashtagRule.MAX_COUNT} хэш-тегов`;
    return false;
  }

  for (const hashtag of hashtags) {
    if (hashtag.length > HashtagRule.MAX_LENGTH || !HashtagRule.PATTERN.test(hashtag)) {
      hashtagsError = `Неверный хэш-тег ${hashtag}: нужна # и буквы или цифры, всего до ${HashtagRule.MAX_LENGTH} символов`;
      return false;
    }

    const lowerHashtag = hashtag.toLowerCase();
    if (seen.includes(lowerHashtag)) {
      hashtagsError = `Хэш-тег ${hashtag} уже есть в списке`;
      return false;
    }
    seen.push(lowerHashtag);
  }

  return true;
}

function getHashtagsError() {
  return hashtagsError;
}

function checkDescription(value) {
  return value.length <= DESCRIPTION_MAX_LENGTH;
}

pristine.addValidator(hashtagsInput, checkHashtags, getHashtagsError);
pristine.addValidator(descriptionInput, checkDescription, `Максимум ${DESCRIPTION_MAX_LENGTH} символов в комментарии`);

function isFormValid() {
  return pristine.validate();
}

function resetValidation() {
  pristine.reset();
}

export {isFormValid, resetValidation};
