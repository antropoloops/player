import * as d3 from "d3";

// Number of slices in a circle
const circleNumSlices = 36;

// Scale. Get the degrees for a specific slice
const degreesFromSlice = d3
  .scaleLinear()
  .range([0, 360]) // working in degrees
  .domain([0, circleNumSlices]);

export default function drawCircle(parent, screenWidth, cx, cy, params) {
  const { duration, trackVolume, trackColor } = params;
  const circlesGroup = parent
    .append("g")
    .attr("class", "circleGroup")
    .attr("transform", `translate(${cx}, ${cy})`);

  // We need to group again, so that the circle turns in its location
  const circle = circlesGroup.append("g").attr("class", "circle");

  // Arc generator
  const arc = d3.arc();

  // Create outerArcs data
  const outerArcs = createOuterArcs(circleNumSlices, screenWidth, trackVolume);

  // Draw outerArcs
  circle
    .selectAll(".outerArcs")
    .data(outerArcs)
    .enter()
    .append("path")
    .attr("class", "outerArcs")
    .attr("d", arc)
    .style("fill", trackColor)
    .style("opacity", (d, i) => {
      return (0.3 / circleNumSlices) * i;
    });

  // Create innerArcs data
  const innerArcs = createInnerArcs(circleNumSlices, screenWidth, trackVolume);

  // Draw innerArcs
  circle
    .selectAll(".innerArcs")
    .data(innerArcs)
    .enter()
    .append("path")
    .attr("class", "innerArcs")
    .attr("d", arc)
    .style("fill", trackColor)
    .style("opacity", (d, i) => {
      return (1 / circleNumSlices) * i;
    });

  circle
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -((screenWidth / 30) * trackVolume + screenWidth / 350))
    .style("stroke", trackColor)
    .style("stroke-width", 1.5);

  // Add animation to make the circle turn
  const turnTimer = d3.timer(turn);
  function turn(elapsed) {
    const elapsedSeconds = (elapsed / 1000) % duration;
    const turnScale = d3
      .scaleLinear()
      .range([1, 0])
      .domain([0, duration]);
    circle.style("transform", `rotate(${-turnScale(elapsedSeconds)}turn)`);
    if (d3.select(".circle").empty()) {
      turnTimer.stop();
    }
  }

  return circlesGroup;
}

function createInnerArcs(circleNumSlices, screenWidth, trackVolume) {
  return d3.range(circleNumSlices).map((d, i) => {
    return {
      startAngle: deg2rad(degreesFromSlice(d)),
      endAngle:
        i === circleNumSlices - 1
          ? deg2rad(degreesFromSlice(d + 1))
          : deg2rad(degreesFromSlice(d + 2)),
      innerRadius: 0,
      outerRadius: (screenWidth / 30) * trackVolume
    };
  });
}

function createOuterArcs(circleNumSlices, screenWidth, trackVolume) {
  return d3.range(circleNumSlices).map((d, i) => {
    return {
      startAngle: deg2rad(degreesFromSlice(d)),
      endAngle:
        i === circleNumSlices - 1
          ? deg2rad(degreesFromSlice(d + 1))
          : deg2rad(degreesFromSlice(d + 2)),
      innerRadius: 0,
      outerRadius: (screenWidth / 30) * trackVolume * 2
    };
  });
}

// Transform degrees into radians
function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}
