import { select } from "d3";
import { WORLDRATIO, getAlbumHeight } from "./dimensions";

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

    // REVIEW: Me gustaría quitar esto de aquí porque es algo específico del mapa
    // Y no siempre vamos a tener mapa
    // Pensé en ponerlo en el constructor pero entonces
    // no se actualiza cuando cambia el tamaño de la pantalla
    // Supongo que cuando metamos la lógica de si es panel o es mapa tendrá su sitio más claro
    this.scale = calculateMapScale(this.el);

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

function calculateMapScale(el) {
  const mapWidth = el.offsetWidth;
  const mapHeight = el.offsetHeight - getAlbumHeight(el.offsetWidth);
  const containerAspectRatio = mapWidth / mapHeight;

  const width =
    containerAspectRatio < WORLDRATIO ? mapWidth : mapHeight * WORLDRATIO;

  // This is the scale for a world map drawn using the robinson projection to fit in a rectangle
  // with a WORLDRATIO proportion, defined as width dependent
  const scale = width / 5.9;

  return scale;
}
