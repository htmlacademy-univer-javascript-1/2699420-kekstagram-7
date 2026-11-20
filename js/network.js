const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

async function loadPictures() {
  const response = await fetch(`${SERVER_URL}/data`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`);
  }

  return response.json();
}

async function uploadPicture(formData) {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки: ${response.status}`);
  }

  return response.json();
}

export {loadPictures, uploadPicture};
