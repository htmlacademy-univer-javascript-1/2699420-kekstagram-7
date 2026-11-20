import {loadPictures} from './network.js';
import {renderMiniatures} from './miniatures.js';
import {notifyLoadError} from './notifications.js';
import {setupSorting} from './sorting.js';
import './upload-form.js';

async function start() {
  try {
    const pictures = await loadPictures();
    renderMiniatures(pictures);
    setupSorting(pictures, renderMiniatures);
  } catch (error) {
    notifyLoadError(error.message);
  }
}

start();
