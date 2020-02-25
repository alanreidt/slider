class ViewController {
  constructor(anchorElement, model) {
    this.anchorElement = anchorElement;
    this.model = model;

    this._bindMethods();
    this._attachElements();
    this.form.addEventListener('submit', this._handleFormSubmit);
  }

  _bindMethods() {
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _attachElements() {
    this.form = this.anchorElement.querySelector('.js-control-pane__form');
    this.boundariesTextInput = this.anchorElement.querySelector('.js-boundaries-text-input');
    this.valuesTextInput = this.anchorElement.querySelector('.js-values-text-input');
    this.stepNumberInput = this.anchorElement.querySelector('.js-step-number-input');
    this.orientationCheckbox = this.anchorElement.querySelector('.js-orientation-checkbox');
    this.hasTooltipsCheckbox = this.anchorElement.querySelector('.js-hasTooltips-checkbox');
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    const boundaries = this.boundariesTextInput.value.split(', ');
    const values = this.valuesTextInput.value.split(', ');
    const step = this.stepNumberInput.valueAsNumber;
    const orientation = this.orientationCheckbox.checked ? 'vertical' : 'horizontal';
    const hasTooltips = this.hasTooltipsCheckbox.checked;

    model.setOptions({
      boundaries,
      values,
      step,
      hasTooltips,
      orientation,
    });
  }
}

export default ViewController;