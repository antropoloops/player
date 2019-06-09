import * as topojson from "topojson";

import { RATIOS, getAlbumHeight } from "./dimensions";

import drawCircle from "./drawCircle";
import drawAlbum from "./drawAlbum";
import drawRefLine from "./drawRefLine";
import drawWave from "./drawWave";
import { drawMap, createProjection } from "./drawMap";
import getAlbumInfo from "./getAlbumInfo";

const remove = (name, group) => {
  const value = group[name];
  if (value) {
    value.remove();
    group[name] = null;
  }
};

/**
 * It stores the state required to render visualizations
 */
export default class Visuals {
  constructor(set, display) {
    this.set = set;
    this.display = display;
    this.circles = {};
    this.albums = {};
    this.refLines = {};
    this.fixedAspectRatio = RATIOS.sixteenTenths;
  }

  setGeodata(geodata) {
    this.countries = topojson
      .feature(geodata, geodata.objects.countries)
      .features.filter(country => country.id !== "010");
    this.setup();
  }

  show(name) {
    // REVIEW: See if there is a better way to get this info
    const { width, height, scale } = this.display.dimensions;
    const { scaleFactor, lambda, verticalShift } = this.set.visuals.focus;
    const albumsHeight = getAlbumHeight(width);

    const projection = createProjection(
      width,
      height - albumsHeight,
      scaleFactor * scale,
      verticalShift,
      lambda
    );

    const info = getAlbumInfo(this.set, name);
    if (!info) return;

    const [cx, cy] = projection(info.lnglat);

    const circle = drawCircle(this.circlesContainer, width, cx, cy, info);
    this.circles[name] = circle;

    const album = drawAlbum(this.albumsContainer, width, info);
    this.albums[name] = album;

    const refLine = drawRefLine(
      this.refLinesContainer,
      width,
      cx,
      cy,
      info.trackNumber,
      info.trackColor
    );
    this.refLines[name] = refLine;

    drawWave(
      this.wavesContainer,
      width,
      cx,
      cy,
      info.trackColor,
      info.trackVolume
    );
  }

  hide(name) {
    remove(name, this.circles);
    remove(name, this.albums);
    remove(name, this.refLines);
  }

  resizeSvg() {
    // TODO: create a resize function that only changes the svg viewBox
    this.setup();
  }

  setup() {
    this.display.clear();
    this.display.createSvg();
    const { width } = this.display.dimensions;
    const albumsHeight = getAlbumHeight(width);

    const svg = this.display.svg;

    this.mapContainer = createGroup(svg, "map", albumsHeight);
    this.albumsContainer = createGroup(svg, "albums", 0);
    this.refLinesContainer = createGroup(svg, "refLines", albumsHeight);
    this.circlesContainer = createGroup(svg, "circles", albumsHeight);
    this.wavesContainer = createGroup(svg, "waves", albumsHeight);

    drawMap(
      this.mapContainer,
      this.countries,
      this.display.dimensions,
      this.set.visuals.focus
    );
  }
}

function createGroup(svg, id, height) {
  return svg
    .append("g")
    .attr("id", id)
    .attr("transform", `translate(0, ${height})`);
}
