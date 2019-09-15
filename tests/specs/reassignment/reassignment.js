import {reassignmentByCorrect} from "./reassignmentByCorrect";
import {reassignmentByIncorrect} from "./reassignmentByIncorrect";
import {reassignmentCorrectionOfValueByBoundaries} from "./reassignmentCorrectionOfValueByBoundaries";
import {reassignmentCorrectionOfStepByBoundaries} from "./reassignmentCorrectionOfStepByBoundaries";
import {reassignmentCorrectionOfStepOverflowByBoundaries} from "./reassignmentCorrectionOfStepOverflowByBoundaries";
import {reassignmentCorrectionOfValueByStep} from "./reassignmentCorrectionOfValueByStep";
import {reassignmentCorrectionOfValue} from "./reassignmentCorrectionOfValue";
import {reassignmentCorrectionOfValueOverflow} from "./reassignmentCorrectionOfValueOverflow";
import {reassignmentCorrectionOfStep} from "./reassignmentCorrectionOfStep";
import {reassignmentCorrectionOfStepOverflow} from "./reassignmentCorrectionOfStepOverflow";
import {reassignmentBoundariesMin} from "./reassignmentBoundariesMin";
import {reassignmentBoundariesMax} from "./reassignmentBoundariesMax";
import {reassignmentValueArray} from "./reassignmentValueArray";
import {reassignmentValueArrayWithIncorrect} from "./reassignmentValueArrayWithIncorrect";
import {reassignmentValueDefault} from "./reassignmentValueDefault";

import {Slider} from "../../../src/Slider";

function testClass({Class, ClassOptions, options, expectations} = {}) {

  expectations.forEach( (expectation, index) => {
    let subject = new Class(ClassOptions);
    let option = options[index];
    let optionsRecord = '';

    for (let optionKey in option) {
      let optionValue = option[optionKey];

      subject[optionKey] = optionValue;
      optionsRecord += `${optionKey} = ${optionValue}, `;
    };

    context(`if ${optionsRecord} were passed`, function() {
      for (let expectationKey in expectation) {
        let expectationValue = expectation[expectationKey];
        let subjectValue = subject[expectationKey];

        it(`than ${expectationKey} shall be equal to ${expectationValue}`, function() {
          assert.deepEqual(subjectValue, expectationValue);
        });
      }
    });
  });

}


export function reassignment() {

  describe("shall change values, if correct one is passed", function() {
    let options = [
      {boundaries: [100, 500],
      value: 180,
      step: 20,
      orientation: "vertical",
      tooltips: true},
    ];
    let expectations = options;
    let Class = Slider;
    let testOptions = {Class, options, expectations};

    testClass(testOptions);
  });


  describe("shall not change values, if incorrect one is passed", function() {
    let options = [
      {boundaries: [true, false],
      value: false,
      step: "two",
      orientation: 100,
      tooltips: 2},
    ];
    let expectations = [
      {boundaries: [0, 100],
      value: 50,
      step: null,
      orientation: "horizontal",
      tooltips: false},
    ];
    let Class = Slider;
    let testOptions = {Class, options, expectations};

    testClass(testOptions);
  });


  describe("shall correct values", function() {

    context(`shall correct {value},
    if passed value isn't correspond to {step}`, function() {
      let options = [
        {boundaries: [0, 500], step: 100, value: 190},
        {boundaries: [-500, 500], step: 250, value: -100},
        {boundaries: [-1000, -500], step: 50, value: -525},
      ];
      let expectations = [
        {value: 200},
        {value: 0},
        {value: -500},
      ];
      let Class = Slider;
      let testOptions = {Class, options, expectations};

      testClass(testOptions);
    });

    context(`shall correct {value},
    if passed value is out of {boundaries}`, function() {
      let options = [
        {boundaries: [0, 500], value: 1000},
        {boundaries: [-500, 500], value: -1000},
        {boundaries: [-500, 500], value: [-1000, 1000]},
        {boundaries: [-500, 500], value: [-1000, 250, 1000]},
        {boundaries: [-500, 500], value: [-2000, -1000, 250, 1000, 2000]},
      ];
      let expectations = [
        {value: 500},
        {value: -500},
        {value: [-500, 500]},
        {value: [-500, 250, 500]},
        {value: [-500, 250, 500]},
      ];
      let Class = Slider;
      let testOptions = {Class, options, expectations};

      testClass(testOptions);
    });

    context(`shall correct {step},
    if passed value isn't correspond to {boundaries(range)}`, function() {
      let options = [
        {step: 30},
        {boundaries: [0, 300], step: 250},
        {boundaries: [-500, 500], step: 105},
      ];
      let expectations = [
        {step: 20},
        {boundaries: [0, 300], step: 300},
        {boundaries: [-500, 500], step: 100},
      ];
      let Class = Slider;
      let testOptions = {Class, options, expectations};

      testClass(testOptions);
    });

    context(`shall correct {step},
    if passed value is bigger than difference of {boundaries(range)}`, function() {
      let options = [
        {step: 200},
        {boundaries: [300, 900], step: 1000},
        {boundaries: [-500, 500], step: 2000},
      ];
      let expectations = [
        {step: 100},
        {boundaries: [300, 900], step: 600},
        {boundaries: [-500, 500], step: 1000},
      ];
      let Class = Slider;
      let testOptions = {Class, options, expectations};

      testClass(testOptions);
    });

    context(`{boundaries} on change, shall correct {value},
    if it became out of the range`, function() {
      let options = [
        { boundaries: [200, 500] },
        { boundaries: [-500, -200] },
      ];
      let expectations = [
        {boundaries: [200, 500], value: 200},
        {boundaries: [-500, -200], value: -200},
      ];
      let ClassOptions = {
        value: 100,
      };
      let Class = Slider;
      let testOptions = {Class, ClassOptions, options, expectations};

      testClass(testOptions);
    });

    context(`{boundaries} on change, shall correct {step},
    if it stopped to correspond to the range`, function() {
      let options = [
        { boundaries: [0, 90] },
        { boundaries: [-50, 0] },
      ];
      let expectations = [
        {boundaries: [0, 90], step: 15},
        {boundaries: [-50, 0], step: 25},
      ];
      let ClassOptions = {
        step: 20,
      };
      let Class = Slider;
      let testOptions = {Class, ClassOptions, options, expectations};

      testClass(testOptions);
    });

    context(`{boundaries} on change shall correct {step}, if it became bigger,
    than difference of {boundaries(range)}`, function() {
      let options = [
        { boundaries: [0, 90] },
        { boundaries: [-50, 0] },
      ];
      let expectations = [
        {boundaries: [0, 90], step: 90},
        {boundaries: [-50, 0], step: 50},
      ];
      let ClassOptions = {
        step: 100,
      };
      let Class = Slider;
      let testOptions = {Class, ClassOptions, options, expectations};

      testClass(testOptions);
    });

    context(`{step} on change, shall correct {value},
    if it stopped to correspond to its value`, function() {
      let options = [
        { step: 20 },
        { step: 50 },
      ];
      let expectations = [
        {step: 20, value: 80},
        {step: 50, value: 50},
      ];
      let ClassOptions = {
        value: 70,
      };
      let Class = Slider;
      let testOptions = {Class, ClassOptions, options, expectations};

      testClass(testOptions);
    });

  });


  describe(`shall change nearest {boundaries} value,
  if only a number is passed`, function() {

    context(`shall change {boundaries(min)},
    if passed value lay near to it`, function() {
      reassignmentBoundariesMin();
    });

    context(`shall change {boundaries(max)},
    if passed value lay near to it`, function() {
      reassignmentBoundariesMax();
    });

  });


  describe(`shall accept unlimited array of {value} values`, function() {

    context(`shall accept array of {value} values`, function() {
      reassignmentValueArray();
    });

    context(`shall accept array of {value} values and correct incorrect`, function() {
      reassignmentValueArrayWithIncorrect();
    });

  });


  describe("{value} shall be equal to average of {boundaries} by default", function() {
    reassignmentValueDefault();
  });

}
