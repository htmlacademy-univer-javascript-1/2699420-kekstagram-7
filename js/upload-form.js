import {isFormValid, resetValidation} from './validation.js';

const uploadForm = document.querySelector('#upload-select-image');
const fileField = uploadForm.querySelector('#upload-file');
const editor = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
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

fileField.addEventListener('change', openEditor);

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeEditor();
});

uploadForm.addEventListener('submit', (evt) => {
  if (!isFormValid()) {
    evt.preventDefault();
  }
});
