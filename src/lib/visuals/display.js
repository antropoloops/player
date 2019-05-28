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
    this.clear();
  }

  setVisible(isVisible) {
    this.el.style.display = isVisible ? "block" : "none";
  }

  clear() {
    const d3 = select(this.el);
    d3.selectAll("*").remove();

    this.dimensions = calculateDimensions(this.el);
    this.svg = d3
      .append("svg")
      .attr("width", this.dimensions.width)
      .attr("height", this.dimensions.height);
    return this.svg;
  }
}

function calculateDimensions(el) {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const realAspectRatio = w / h;

  const width = realAspectRatio < RATIO ? w : h * RATIO;
  const height = realAspectRatio < RATIO ? w / RATIO : h;
  const scale = RATIO === RATIOS.sixteenTenths ? width / 5.9 : width / 6.5;
  return { width, height, scale };
}
