import * as d3geo from "d3-geo-projection";

const albumsCount = 8;
export const DOT_RADIUS = 2;

export function getHorizontalPadding(screenWidth) {
  return screenWidth / 300;
}

export function getVerticalPadding(screenWidth) {
  return screenWidth / 450;
}

export function getInfoHeight(screenWidth) {
  return screenWidth / 50;
}

export function getCoverSize(screenWidth) {
  return screenWidth / albumsCount;
}

export function getAlbumHeight(screenWidth) {
  const verticalPadding = getVerticalPadding(screenWidth);
  const infoHeight = getInfoHeight(screenWidth);
  return getCoverSize(screenWidth) + verticalPadding + infoHeight * 2;
}

export function getDotOffsetX(screenWidth, trackNumber) {
  return trackNumber * getCoverSize(screenWidth) + DOT_RADIUS;
}

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
