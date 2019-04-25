import * as d3 from "d3";
import { getDotOffsetX } from "./dimensions";

export default function createRefLine(
  parent,
  windowWidth,
  cx,
  cy,
  trackNumber,
  trackColor
) {
  const x1 = getDotOffsetX(windowWidth, trackNumber);
  const y1 = 0;
  const x2 = cx;
  const y2 = cy;
  const h = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const a = h / 10;
  const alfa = Math.acos((y2 - y1) / h);
  const curveCoords = [
    {
      x: x1,
      y: y1
    },
    {
      x: x1 + (x2 - x1) / 2 + a * Math.cos(Math.PI - alfa),
      y: y1 + (y2 - y1) / 2 + a * Math.sin(Math.PI - alfa)
    },
    { x: x2, y: y2 }
  ];

  const line = d3
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveBasis);

  const refLine = parent
    .append("path")
    .datum(curveCoords)
    .attr("d", line)
    .style("stroke", trackColor)
    .style("stroke-dasharray", "2, 3")
    .style("fill", "none")
    .style("stroke-width", 2);

  return refLine;
}
