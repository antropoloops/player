import { select } from "d3";
import { RATIOS } from "./dimensions";

const RATIO = RATIOS.sixteenTenths;

/**
 * A display encapsulates drawing mechanics
 *
 * @param {*} el
 */

export default class Display {
  constructor(el) {
    this.el = el;
    this.createSvg();
    this.clear();
  }

  setVisible(isVisible) {
    this.el.style.display = isVisible ? "block" : "none";
  }

  createSvg() {
    const container = select(this.el);
    this.dimensions = calculateDimensions(this.el);

    this.svg = container
      .append("svg")
      .attr("width", this.dimensions.width)
      .attr("height", this.dimensions.height)
      .attr(
        "viewBox",
        `0 0 ${this.dimensions.width} ${this.dimensions.height}`
      );

    return this.svg;
  }

  clear() {
    const container = select(this.el);
    container.selectAll("*").remove();
  }
}

function calculateDimensions(el) {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const realAspectRatio = w / h;

  // Force the width and the height of the svg to a specific proportion (16/10 or 16/9)
  const width = realAspectRatio < RATIO ? w : h * RATIO;
  const height = realAspectRatio < RATIO ? w / RATIO : h;

  // This is the scale for a world map in a robinson proyection to fit in a rectangle
  // with a 16/10 or 16/9 proportion, defined as width dependent
  const scale = RATIO === RATIOS.sixteenTenths ? width / 5.9 : width / 6.5;

  // REVIEW: width and height are the svg dimensions. scale is the map scale.
  // Maybe they should be in different functions. Not all visuals have a map.
  return { width, height, scale };
}
