import * as chroma from "chroma-js";
import * as d3 from "d3";
// import * as seedrandom from "seedrandom";

export function getColor(trackNumber) {
  // const seedRandom = seedrandom("abcde");
  // const S = d3.randomUniform.source(seedRandom)(0.5, 1)();
  const S = d3.randomUniform(0.5, 1)();
  const V = d3.randomUniform(0.9, 1)();
  const H = getHue(trackNumber);
  return chroma.hsv(H, S, V).hex();
}

function getHue(trackNumber) {
  switch (trackNumber) {
    case 0:
      return d3.randomUniform(105, 120)();
    case 1:
      return d3.randomUniform(145, 160)();
    case 2:
      return d3.randomUniform(300, 315)();
    case 3:
      return d3.randomUniform(330, 345)();
    case 4:
      return d3.randomUniform(190, 205)();
    case 5:
      return d3.randomUniform(210, 225)();
    case 6:
      return d3.randomUniform(25, 40)();
    case 7:
      return d3.randomUniform(50, 65)();
    default:
      return d3.randomUniform(50, 65)();
  }
}
