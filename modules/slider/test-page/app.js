import Slider from '../src/Slider';

const parents = document.querySelectorAll('.js-slider-wrapper');
const parent0 = parents[0];
const parent1 = parents[1];
const parent2 = parents[2];

Slider.create(parent0, {
  boundaries: [-30000, 30000],
  values: [-20000, 10000, 20000],
  step: 1000,
  hasTooltips: true,
});

Slider.create(parent1, {
  boundaries: [0, 233],
  step: 1,
  hasTooltips: true,
});

Slider.create(parent2, {
  orientation: 'vertical',
  hasTooltips: true,
});