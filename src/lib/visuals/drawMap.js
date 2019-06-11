import * as d3geo from "d3-geo-projection";
import * as d3 from "d3";

export function drawMap(container, countries, width, height, scale, mapConfig) {
  const { scaleFactor, center } = mapConfig;

  const projection = createProjection(
    width,
    height,
    scale * scaleFactor,
    center
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

export function createProjection(width, height, scale, center) {
  return d3geo
    .geoRobinson()
    .scale(scale)
    .center([center.x, center.y])
    .translate([width / 2, height / 2]);
}
