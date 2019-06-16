import { select } from "d3";

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

    this.dimensions = {
      width: this.el.offsetWidth,
      height: this.el.offsetHeight
    };

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
