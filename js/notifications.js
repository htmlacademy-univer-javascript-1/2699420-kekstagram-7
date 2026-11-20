const LOAD_ERROR_TIMEOUT = 7000;

let activeNotification = null;

function onNotificationKeydown(evt) {
  if (evt.key === 'Escape' && activeNotification) {
    evt.preventDefault();
    evt.stopPropagation();
    closeNotification();
  }
}

function closeNotification() {
  activeNotification.remove();
  activeNotification = null;
  document.removeEventListener('keydown', onNotificationKeydown, true);
}

function openNotification(type) {
  const notification = document.querySelector(`#${type}`).content.firstElementChild.cloneNode(true);

  notification.addEventListener('click', (evt) => {
    if (evt.target === notification || evt.target.classList.contains(`${type}__button`)) {
      closeNotification();
    }
  });

  activeNotification = notification;
  document.body.append(notification);
  document.addEventListener('keydown', onNotificationKeydown, true);
}

function notifySuccess() {
  openNotification('success');
}

function notifyError() {
  openNotification('error');
}

function notifyLoadError(message) {
  const banner = document.createElement('div');
  banner.className = 'data-error';
  banner.textContent = `${message}. Попробуйте обновить страницу позже.`;
  document.body.append(banner);

  setTimeout(() => banner.remove(), LOAD_ERROR_TIMEOUT);
}

export {notifySuccess, notifyError, notifyLoadError};
