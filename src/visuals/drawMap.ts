import * as d3 from "d3";
import * as d3geo from "d3-geo-projection";
import { MapMetadata } from "../audioset";
import { WORLDRATIO } from "./dimensions";

export function drawMap(
  container: any,
  countries: any,
  width: number,
  height: number,
  visuals: MapMetadata
) {
  const scaleFactor = visuals.geomap.scaleFactor;
  const center = visuals.geomap.center;
  const scale = calculateMapScale(width, height);

  const projector = createMapProjector(
    width,
    height,
    scale * scaleFactor,
    center
  );

  const path = d3.geoPath().projection(projector);

  container
    .selectAll(".countries")
    .data(countries)
    .enter()
    .append("path")
    .attr("id", (d: { id: any }) => `country${d.id}`)
    .attr("class", "countries")
    .attr("d", path)
    .style("stroke", "#2c2c2c")
    .style("stroke-width", 0.5)
    .style("fill", "#888888");
}

export function createMapProjector(
  width: number,
  height: number,
  scale: number,
  center: { x: any; y: any }
) {
  return d3geo
    .geoRobinson()
    .scale(scale)
    .center([center.x, center.y])
    .translate([width / 2, height / 2]);
}

export function calculateMapScale(width: number, height: number) {
  const containerAspectRatio = width / height;
  const mapWidth =
    containerAspectRatio < WORLDRATIO ? width : height * WORLDRATIO;

  // This is the scale needed for a world map drawn using the robinson projection to fit in a rectangle
  // with a WORLDRATIO proportion, defined as width-dependent
  const scale = mapWidth / 5.9;

  return scale;
}
