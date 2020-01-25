import * as topojson from "topojson";

import { getAlbumHeight } from "./dimensions";

import { Audioset, VisualsMetadata } from "../audioset";
import { Dimension, Display } from "./display";
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

function createProjector(visuals: VisualsMetadata, dimensions: Dimension) {
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
export class Visuals {
  public circles: Record<string, any>;
  public albums: Record<string, any>;
  public refLines: Record<string, any>;
  public countries: any;
  public backgroundContainer: any;
  public circlesContainer!: Record<string, any>;
  public albumsContainer!: Record<string, any>;
  public refLinesContainer!: Record<string, any>;
  public wavesContainer!: Record<string, any>;
  private display: Display;

  constructor(private set: Audioset, el: any) {
    this.display = new Display(el);
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
  }

  public show(name: string) {
    const clip = this.set.index.clipById[name];
    if (!clip) {
      return;
    }

    // REVIEW: See if there is a better way to get this info (scale, projection)
    // that is already calculated in drawMap
    const dimensions = this.display.getDimensions();
    const { width } = dimensions;

    const projector = createProjector(this.set.visuals, dimensions);
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

  public resizeSvg(width: number, height: number) {
    // TODO: create a resize function that only changes the svg viewBox
    this.setup();
  }

  public setup() {
    this.display.clear();
    this.display.createSvg();

    const dimensions = this.display.getDimensions();
    const backgroundWidth = dimensions.width;
    const albumsHeight = getAlbumHeight(backgroundWidth);
    const backgroundHeight = dimensions.height - albumsHeight;

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
