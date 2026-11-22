import {loadPictures} from './network.js';
import {renderMiniatures} from './miniatures.js';
import {notifyLoadError} from './notifications.js';
import './upload-form.js';

async function start() {
  try {
    const pictures = await loadPictures();
    renderMiniatures(pictures);
  } catch (error) {
    notifyLoadError(error.message);
  }
}

start();
