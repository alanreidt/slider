import { findNextFactor, isDivisible } from '../../utilities';

class ViewController {
  constructor(anchorElement, model) {
    this._anchorElement = anchorElement;
    this._model = model;

    this._attachElements();
    this._paint(this._model.getOptions());
  }

  _attachElements() {
    this._scale =
      this._anchorElement.querySelector('.js-scale') || this._anchorElement;
  }

  _paint(options) {
    const values = this._calcScaleValues(options);

    this._anchorElement.innerHTML = `<div class="scale js-scale">
        ${values.reduce((str, value) => {
          return `${str}<div class="scale__segment">
            <span class="scale__pip"></span>
            <span class="scale__value">${value}</span>
          </div>`;
        }, '')}
      </div>`;
  }

  _calcScaleValues({ boundaries, step }) {
    const [min, max] = boundaries;
    const range = max - min;
    const scaleWidth = this._getScaleWidth();
    const minimalSparsity = 24;

    let scaleStep = step;
    let scaleValuesQuantity = range / step + 1;
    let currentSparsity = scaleWidth / scaleValuesQuantity - 1;

    while (
      currentSparsity < minimalSparsity ||
      (!isDivisible(scaleStep, step) && scaleStep < range)
    ) {
      scaleStep = findNextFactor(range, scaleStep + 1);

      scaleValuesQuantity = range / scaleStep + 1;
      currentSparsity = scaleWidth / scaleValuesQuantity - 1;
    }

    const scaleValues = new Array(scaleValuesQuantity)
      .fill(min)
      .map((value, index) => index * scaleStep + value);

    return scaleValues;
  }

  _getScaleWidth() {
    return this._scale.getBoundingClientRect().width;
  }
}

export default ViewController;
