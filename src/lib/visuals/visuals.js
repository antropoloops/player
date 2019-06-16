import * as topojson from "topojson";

import { getAlbumHeight } from "./dimensions";

import drawCircle from "./drawCircle";
import drawAlbum from "./drawAlbum";
import drawRefLine from "./drawRefLine";
import drawWave from "./drawWave";
import { drawMap, calculateMapScale, createMapProjector } from "./drawMap";
import { drawPanel, createPanelProjector } from "./drawPanel";
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
    this.mode = set.visuals.mode;
  }

  setGeodata(geodata) {
    this.countries = topojson
      .feature(geodata, geodata.objects.countries)
      .features.filter(country => country.id !== "010");
    this.setup();
  }

  show(name) {
    // REVIEW: See if there is a better way to get this info (scale, projection)
    // that is already calculated in drawMap
    const { width, height } = this.display.dimensions;
    const { scaleFactor, center } = this.set.visuals.geomap;
    const albumsHeight = getAlbumHeight(width);

    const scale = calculateMapScale(width, height - albumsHeight);

    const info = getAlbumInfo(this.set, name);
    if (!info) return;

    const projector =
      this.mode === "map"
        ? createMapProjector(
            width,
            height - albumsHeight,
            scaleFactor * scale,
            center
          )
        : createPanelProjector(
            width,
            height - albumsHeight,
            this.set.visuals.image.size.width,
            this.set.visuals.image.size.height
          );

    const [cx, cy] = projector(info.position);

    // REVIEW: fix width parameter to draw circles with the proper size
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

    const backgroundWidth = this.display.dimensions.width;
    const albumsHeight = getAlbumHeight(backgroundWidth);
    const backgroundHeight = this.display.dimensions.height - albumsHeight;

    const svg = this.display.svg;

    this.backgroundContainer = createGroup(svg, "background", albumsHeight);
    this.albumsContainer = createGroup(svg, "albums", 0);
    this.refLinesContainer = createGroup(svg, "refLines", albumsHeight);
    this.circlesContainer = createGroup(svg, "circles", albumsHeight);
    this.wavesContainer = createGroup(svg, "waves", albumsHeight);

    if (this.mode === "map") {
      drawMap(
        this.backgroundContainer,
        this.countries,
        backgroundWidth,
        backgroundHeight,
        this.set.visuals.geomap
      );
    } else {
      drawPanel(
        this.backgroundContainer,
        backgroundWidth,
        backgroundHeight,
        this.set.visuals.image.url
      );
    }
  }
}

function createGroup(svg, id, height) {
  return svg
    .append("g")
    .attr("id", id)
    .attr("transform", `translate(0, ${height})`);
}
