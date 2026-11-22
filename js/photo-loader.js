const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const photo = document.querySelector('.img-upload__preview img');
const effectThumbnails = document.querySelectorAll('.effects__preview');

let photoUrl = '';

function isImageFile(file) {
  const extension = file.name.toLowerCase().split('.').pop();
  return ALLOWED_EXTENSIONS.includes(extension);
}

function loadPhoto(file) {
  if (!file || !isImageFile(file)) {
    return false;
  }

  if (photoUrl) {
    URL.revokeObjectURL(photoUrl);
  }

  photoUrl = URL.createObjectURL(file);
  photo.src = photoUrl;
  effectThumbnails.forEach((thumbnail) => {
    thumbnail.style.backgroundImage = `url('${photoUrl}')`;
  });

  return true;
}

export {loadPhoto};
