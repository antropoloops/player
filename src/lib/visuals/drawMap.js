import * as d3geo from "d3-geo-projection";
import * as d3 from "d3";
import { getAlbumHeight } from "./dimensions";

export function drawMap(container, countries, dimensions, projectionConfig) {
  const { width, height, scale } = dimensions;
  const { scaleFactor, lambda, verticalShift } = projectionConfig;

  const albumsHeight = getAlbumHeight(width);

  const projection = createProjection(
    width,
    height - albumsHeight,
    scaleFactor * scale,
    verticalShift,
    lambda
  );
  const path = d3.geoPath().projection(projection);

  container
    .selectAll(".countries")
    .data(countries)
    .enter()
    .append("path")
    .attr("id", d => `country${d.id}`)
    .attr("class", "countries")
    .attr("d", path)
    .style("stroke", "#2c2c2c")
    .style("stroke-width", 0.5)
    .style("fill", "#888888");
}

export function createProjection(width, height, scale, verticalShift, lambda) {
  return d3geo
    .geoRobinson()
    .scale(scale)
    .translate([width / 2, height / 2 + height / verticalShift])
    .rotate([lambda, 0, 0]);
}
