import { select } from "d3";

export interface Dimension {
  width: number;
  height: number;
}

/**
 * A display encapsulates drawing mechanics
 *
 * @param {*} el
 */

export default class Display {
  public el: any;
  public dimensions: Dimension;
  public svg: any;
  constructor(el: any) {
    this.el = el;
    this.dimensions = {
      width: this.el.offsetWidth,
      height: this.el.offsetHeight,
    };
    this.createSvg();
    this.clear();
  }

  public setVisible(isVisible: boolean) {
    this.el.style.display = isVisible ? "block" : "none";
  }

  public createSvg() {
    const container = select(this.el);

    this.svg = container
      .append("svg")
      .attr("width", this.dimensions.width)
      .attr("height", this.dimensions.height)
      .attr(
        "viewBox",
        `0 0 ${this.dimensions.width} ${this.dimensions.height}`,
      );

    return this.svg;
  }

  public clear() {
    const container = select(this.el);
    container.selectAll("*").remove();
  }
}
