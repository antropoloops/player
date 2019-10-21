import * as topojson from "topojson";

import { getAlbumHeight } from "./dimensions";

import { Audioset, AudiosetVisuals } from "../Audioset";
import Display, { Dimension } from "./display";
import drawAlbum from "./drawAlbum";
import drawCircle from "./drawCircle";
import { calculateMapScale, createMapProjector, drawMap } from "./drawMap";
import { createPanelProjector, drawPanel } from "./drawPanel";
import drawRefLine from "./drawRefLine";
import drawWave from "./drawWave";

const remove = (name: string, group: any) => {
  const value = group[name];
  if (value) {
    value.remove();
    group[name] = null;
  }
};

function createProjector(visuals: AudiosetVisuals, dimensions: Dimension) {
  const { width, height } = dimensions;
  const albumsHeight = getAlbumHeight(width);
  const scale = calculateMapScale(width, height - albumsHeight);
  if (visuals.mode === "map") {
    const { scaleFactor, center } = visuals.geomap;
    return createMapProjector(
      width,
      height - albumsHeight,
      scaleFactor * scale,
      center,
    );
  } else {
    return createPanelProjector(
      width,
      height - albumsHeight,
      visuals.image.size.width,
      visuals.image.size.height,
    );
  }
}

/**
 * It stores the state required to render visualizations
 */
export default class Visuals {
  public circles: Record<string, any>;
  public albums: Record<string, any>;
  public refLines: Record<string, any>;
  public countries: any;
  public backgroundContainer: any;
  public circlesContainer!: Record<string, any>;
  public albumsContainer!: Record<string, any>;
  public refLinesContainer!: Record<string, any>;
  public wavesContainer!: Record<string, any>;

  constructor(private set: Audioset, private display: Display) {
    this.circles = {};
    this.albums = {};
    this.refLines = {};
  }

  public setGeodata(geodata: any) {
    const collection = topojson.feature(
      geodata,
      geodata.objects.countries,
    ) as any;
    this.countries = collection.features.filter(
      (country: any) => country.id !== "010",
    );
    this.setup();
  }

  public show(name: string) {
    const clip = this.set.index.clipById[name];
    if (!clip) {
      return;
    }

    // REVIEW: See if there is a better way to get this info (scale, projection)
    // that is already calculated in drawMap
    const { width } = this.display.dimensions;

    const projector = createProjector(
      this.set.visuals,
      this.display.dimensions,
    );
    const [cx, cy] = projector(clip.position);

    // REVIEW: fix width parameter to draw circles with the proper size
    const circle = drawCircle(this.circlesContainer, width, cx, cy, clip);
    this.circles[name] = circle;

    const album = drawAlbum(this.albumsContainer, width, clip);
    this.albums[name] = album;

    const refLine = drawRefLine(this.refLinesContainer, width, cx, cy, clip);
    this.refLines[name] = refLine;

    drawWave(this.wavesContainer, width, cx, cy, clip);
  }

  public hide(name: string) {
    remove(name, this.circles);
    remove(name, this.albums);
    remove(name, this.refLines);
  }

  public resizeSvg() {
    // TODO: create a resize function that only changes the svg viewBox
    this.setup();
  }

  public setup() {
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

    if (this.set.visuals.mode === "map") {
      drawMap(
        this.backgroundContainer,
        this.countries,
        backgroundWidth,
        backgroundHeight,
        this.set.visuals,
      );
    } else {
      drawPanel(
        this.backgroundContainer,
        backgroundWidth,
        backgroundHeight,
        this.set.visuals.image.url,
      );
    }
  }
}

function createGroup(svg: any, id: string, height: number) {
  return svg
    .append("g")
    .attr("id", id)
    .attr("transform", `translate(0, ${height})`);
}