import * as d3 from "d3";
import * as chroma from "chroma-js";

export function createImprint(point, color) {
  d3.selectAll(".countries").each(polygon => {
    const inside = d3.geoContains(polygon, point);
    if (inside) {
      const base = d3.select(`#country${polygon.id}`).style("fill");
      d3.select(`#country${polygon.id}`)
        // .style("fill", chroma.blend(base, color, "lighten").hex()); // applies trackColor
        .style("fill", chroma(base).brighten(0.2)); // gray to white. Step: 0.2
    }
  });
}
