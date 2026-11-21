const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const EFFECTS = [
  {name: 'none', style: '', min: 0, max: 100, step: 1, unit: ''},
  {name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  {name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  {name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  {name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  {name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
];

const ORIGINAL_EFFECT = EFFECTS[0];

const uploadForm = document.querySelector('#upload-select-image');
const photo = uploadForm.querySelector('.img-upload__preview img');
const scaleInput = uploadForm.querySelector('.scale__control--value');
const scaleDownButton = uploadForm.querySelector('.scale__control--smaller');
const scaleUpButton = uploadForm.querySelector('.scale__control--bigger');
const levelBox = uploadForm.querySelector('.img-upload__effect-level');
const levelInput = uploadForm.querySelector('.effect-level__value');
const levelSlider = uploadForm.querySelector('.effect-level__slider');
const effectsBox = uploadForm.querySelector('.img-upload__effects');

let scale = Scale.MAX;
let activeEffect = ORIGINAL_EFFECT;

function setScale(value) {
  scale = value;
  scaleInput.value = `${scale}%`;
  photo.style.transform = `scale(${scale / 100})`;
}

function onScaleDownClick() {
  if (scale > Scale.MIN) {
    setScale(scale - Scale.STEP);
  }
}

function onScaleUpClick() {
  if (scale < Scale.MAX) {
    setScale(scale + Scale.STEP);
  }
}

noUiSlider.create(levelSlider, {
  range: {min: ORIGINAL_EFFECT.min, max: ORIGINAL_EFFECT.max},
  start: ORIGINAL_EFFECT.max,
  step: ORIGINAL_EFFECT.step,
  connect: 'lower',
  format: {
    to: (value) => String(Number(value.toFixed(1))),
    from: (value) => Number(value),
  },
});

function onSliderUpdate() {
  const level = levelSlider.noUiSlider.get();

  if (activeEffect === ORIGINAL_EFFECT) {
    photo.style.removeProperty('filter');
    levelInput.value = '';
    return;
  }

  photo.style.filter = `${activeEffect.style}(${level}${activeEffect.unit})`;
  levelInput.value = level;
}

function selectEffect(name) {
  activeEffect = EFFECTS.find((effect) => effect.name === name) || ORIGINAL_EFFECT;

  if (activeEffect === ORIGINAL_EFFECT) {
    levelBox.classList.add('hidden');
  } else {
    levelBox.classList.remove('hidden');
  }

  levelSlider.noUiSlider.updateOptions({
    range: {min: activeEffect.min, max: activeEffect.max},
    step: activeEffect.step,
    start: activeEffect.max,
  });
}

function onEffectsChange(evt) {
  if (evt.target.name === 'effect') {
    selectEffect(evt.target.value);
  }
}

function resetEditor() {
  setScale(Scale.MAX);
  selectEffect(ORIGINAL_EFFECT.name);
}

scaleDownButton.addEventListener('click', onScaleDownClick);
scaleUpButton.addEventListener('click', onScaleUpClick);
levelSlider.noUiSlider.on('update', onSliderUpdate);
effectsBox.addEventListener('change', onEffectsChange);

resetEditor();

export {resetEditor};
