import {generatePictures} from './pictures.js';
import {renderMiniatures} from './miniatures.js';

const pictures = generatePictures();

renderMiniatures(pictures);
