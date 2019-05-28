import * as d3geo from "d3-geo-projection";

const albumsCount = 8;
// export const DOT_RADIUS = 2;

// Small horizontal space between the name of the country and the rectangle border
export function getHorizontalPadding(visualsWidth) {
  return visualsWidth / 300;
}

// Small vertical space between the album cover and the color rectangle under the cover
export function getVerticalPadding(visualsWidth) {
  return visualsWidth / 450;
}

// Height of the rectangle under the cover
export function getInfoHeight(visualsWidth) {
  return visualsWidth / 50;
}

export function getCoverSize(visualsWidth) {
  return visualsWidth / albumsCount;
}

export function getAlbumHeight(visualsWidth) {
  const verticalPadding = getVerticalPadding(visualsWidth);
  const infoHeight = getInfoHeight(visualsWidth);
  return getCoverSize(visualsWidth) + verticalPadding + infoHeight;
}

// REVIEW: Check if we really need 2 different screen proportions
export const RATIOS = {
  sixteenNinths: 16 / 9,
  sixteenTenths: 16 / 10
};

export function createProjection(width, height, scale, verticalShift, lambda) {
  return d3geo
    .geoRobinson()
    .scale(scale)
    .translate([width / 2, height / 2 + height / verticalShift])
    .rotate([lambda, 0, 0]);
}
