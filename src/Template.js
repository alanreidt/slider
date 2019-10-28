export class Template {

  createDefault({boundaries, values, hasTooltips} = {}) {
    const positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

    return(
      `<div class="slider__base">
        ${positions.reduce( (str, position, i) => {
          return str +
          `<div class="slider__handle-group" style="left: ${position}">
            ${hasTooltips ? `<div class="slider__tooltip">${values[i]}</div>` : ''}
            <div class="slider__handle"></div>
          </div>`;
        }, '')}
      </div>`
    );
  }

}
