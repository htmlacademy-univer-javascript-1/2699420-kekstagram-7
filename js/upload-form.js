import {isFormValid, resetValidation} from './validation.js';
import {resetEditor} from './image-editor.js';
import {uploadPicture} from './network.js';
import {loadPhoto} from './photo-loader.js';
import {notifySuccess, notifyError} from './notifications.js';

const SubmitText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...',
};

const uploadForm = document.querySelector('#upload-select-image');
const fileField = uploadForm.querySelector('#upload-file');
const editor = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
const submitButton = uploadForm.querySelector('#upload-submit');
const textFields = uploadForm.querySelectorAll('.text__hashtags, .text__description');

function onEditorEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditor();
  }
}

function openEditor() {
  editor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditorEscKeydown);
}

function closeEditor() {
  uploadForm.reset();
  resetValidation();
  resetEditor();
  editor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditorEscKeydown);
}

textFields.forEach((field) => {
  field.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
});

fileField.addEventListener('change', () => {
  if (loadPhoto(fileField.files[0])) {
    openEditor();
  } else {
    fileField.value = '';
  }
});

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeEditor();
});

function toggleSubmitButton(isSending) {
  submitButton.disabled = isSending;
  submitButton.textContent = isSending ? SubmitText.SENDING : SubmitText.IDLE;
}

uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (!isFormValid()) {
    return;
  }

  toggleSubmitButton(true);

  try {
    await uploadPicture(new FormData(uploadForm));
    closeEditor();
    notifySuccess();
  } catch (error) {
    notifyError();
  } finally {
    toggleSubmitButton(false);
  }
});
