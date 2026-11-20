import {generatePictures} from './pictures.js';
import {renderMiniatures} from './miniatures.js';
import './upload-form.js';

const pictures = generatePictures();

renderMiniatures(pictures);
