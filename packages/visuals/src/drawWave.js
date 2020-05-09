import * as d3 from "d3";

export default function createWave(
  parent,
  screenWidth,
  cx,
  cy,
  trackColor,
  trackVolume
) {
  const firstRadius = Math.floor((screenWidth / 30) * trackVolume);
  const lastRadius = 150;
  const radius = d3.range(firstRadius, lastRadius);
  const duration = 20;

  const wave = parent
    .append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 0)
    .style("fill", "none")
    .style("stroke", trackColor);

  radius.forEach((r, i) => {
    const initialWidth = 2;
    const strokeWidth = initialWidth - (initialWidth * r) / lastRadius;
    wave
      .transition()
      .duration(duration)
      .delay(i * duration)
      .attr("r", r)
      .style("stroke-width", strokeWidth)
      .on("end", (d, i, nodes) => {
        if (r === lastRadius - 1) nodes[i].remove();
      });
  });

  return wave;
}
