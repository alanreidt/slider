import {getPositionInPercentageOf, createBase, createHandle, createTooltip, updateHandlePositions} from "./utilities";

export class SliderUI {

  create({boundaries, values, step, orientation, tooltipsState} = {}) {
    let base = createBase();
    let positions = values.map( getPositionInPercentageOf(...boundaries) );

    this.handles = createHandles(positions, tooltipsState);

    base.append(this.handles);

    this.sliderUI = base;
  }

  update({boundaries, values, step, orientation, tooltipsState} = {}) {

    if (values & boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      updateHandlePositions(this.handles, positions);
    }

  }

}
