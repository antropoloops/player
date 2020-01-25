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

export class Display {
  public el: any;
  public svg: any;

  constructor(el: any) {
    this.el = el;
    this.createSvg();
    this.clear();
  }

  public getDimensions() {
    return {
      width: this.el.offsetWidth,
      height: this.el.offsetHeight,
    };
  }

  public setVisible(isVisible: boolean) {
    this.el.style.display = isVisible ? "block" : "none";
  }

  public createSvg() {
    const container = select(this.el);
    const dimensions = this.getDimensions();

    this.svg = container
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

    return this.svg;
  }

  public clear() {
    const container = select(this.el);
    container.selectAll("*").remove();
  }
}
