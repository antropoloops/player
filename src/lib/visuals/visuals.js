import * as d3 from "d3";
import * as topojson from "topojson";

import { RATIOS, createProjection, getAlbumHeight } from "./dimensions";

import drawCircle from "./drawCircle";
import drawAlbum from "./drawAlbum";
import drawRefLine from "./drawRefLine";
import drawWave from "./drawWave";
import { createLastSampleInfo } from "./lastSampleInfo";
import { createImprint } from "./imprint";
import getAlbumInfo from "./getAlbumInfo";

const CONFIG = {
  geoMapUrl: "https://unpkg.com/world-atlas@1.1.4/world/110m.json",
  imprint: false,
  focus: {
    lambda: -10,
    verticalShift: 15,
    scaleFactor: 1
  }
};

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
    this.config = Object.assign({}, CONFIG, set.visuals);
    this.set = set;
    this.display = display;
    this.circles = {};
    this.albums = {};
    this.refLines = {};
    this.infos = {};
    this.fixedAspectRatio = RATIOS.sixteenTenths;
    this.render = this.render.bind(this);
  }

  setGeodata(geodata) {
    this.geodata = geodata;
    this.countries = topojson.feature(
      geodata,
      geodata.objects.countries
    ).features;
    this.render();
  }

  show(name) {
    const info = getAlbumInfo(this.set, name);
    if (!info) return;

    const { width, height } = this.display.dimensions;
    let [cx, cy] = this.projection(info.lnglat);

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

    const lastSampleInfo = createLastSampleInfo(
      this.lastSampleInfoContainer,
      width,
      height,
      info
    );
    this.infos[name] = lastSampleInfo;

    if (this.config.imprint) createImprint(info.lnglat, info.trackColor);
  }

  hide(name) {
    remove(name, this.circles);
    remove(name, this.albums);
    remove(name, this.refLines);
    remove(name, this.infos);
  }

  render() {
    this.display.clear();
    const { width, height, scale } = this.display.dimensions;
    const focusedScale = scale * this.config.focus.scaleFactor;
    const lambda = this.config.focus.lambda;
    const verticalShift = this.config.focus.verticalShift;
    const albumsHeight = getAlbumHeight(width);

    const svg = this.display.svg;

    this.mapContainer = svg
      .append("g")
      .attr("transform", `translate(0, ${albumsHeight})`)
      .append("g")
      .attr("id", "map");

    this.albumsContainer = svg.append("g").attr("id", "albums");
    this.refLinesContainer = svg
      .append("g")
      .attr("id", "refLines")
      .attr("transform", `translate(0, ${albumsHeight})`);
    this.circlesContainer = svg
      .append("g")
      .attr("transform", `translate(0, ${albumsHeight})`)
      .append("g")
      .attr("id", "circles");
    this.wavesContainer = svg
      .append("g")
      .attr("id", "waves")
      .attr("transform", `translate(0, ${albumsHeight})`);
    this.lastSampleInfoContainer = svg
      .append("g")
      .attr("id", "lastSampleInfo")
      .attr("transform", `translate(0, ${albumsHeight})`);

    // Draw map
    if (this.geodata) {
      this.projection = createProjection(
        width,
        height - albumsHeight,
        focusedScale,
        verticalShift,
        lambda
      );
      const path = d3.geoPath().projection(this.projection);
      this.mapContainer
        .selectAll(".countries")
        .data(this.countries)
        .enter()
        .append("path")
        .attr("id", d => `country${d.id}`)
        .attr("class", "countries")
        .attr("d", path)
        .style("stroke", "#2c2c2c")
        .style("stroke-width", 0.5)
        .style("fill", d => (d.id === "010" ? "none" : "#888888")); // 010 Antartica
    }
  }
}
