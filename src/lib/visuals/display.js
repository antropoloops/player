import { select } from "d3";

export const RATIOS = {
  sixteenNinths: 16 / 9,
  sixteenTenths: 16 / 10
};
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

export function getWindowSize(ratio) {
  return getFixedSize(window.innerWidth, window.innerHeight, ratio);
}

function getFixedSize(width, height, ratio) {
  const realAspectRatio = width / height;

  const screenWidth = realAspectRatio < ratio ? width : height * ratio;
  const screenHeight = realAspectRatio < ratio ? width / ratio : height;

  return { screenWidth, screenHeight };
}
