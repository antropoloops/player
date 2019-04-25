import * as chroma from "chroma-js";
import * as d3 from "d3";
// import * as seedrandom from "seedrandom";

export function getColor(trackNumber) {
  // const seedRandom = seedrandom("abcde");
  // const S = d3.randomUniform.source(seedRandom)(0.5, 1)();
  const S = d3.randomUniform(0.5, 1)();
  const V = d3.randomUniform(0.9, 1)();
  let H;
  switch (trackNumber) {
    case 0:
      H = d3.randomUniform(105, 120)();
      break;
    case 1:
      H = d3.randomUniform(145, 160)();
      break;
    case 2:
      H = d3.randomUniform(300, 315)();
      break;
    case 3:
      H = d3.randomUniform(330, 345)();
      break;
    case 4:
      H = d3.randomUniform(190, 205)();
      break;
    case 5:
      H = d3.randomUniform(210, 225)();
      break;
    case 6:
      H = d3.randomUniform(25, 40)();
      break;
    case 7:
      H = d3.randomUniform(50, 65)();
      break;
  }
  return chroma.hsv(H, S, V).hex();
}
