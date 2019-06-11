const ALBUMSCOUNT = 8;

// Proportion of the world map using the Robison projection
export const WORLDRATIO = 2.12;

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
  return visualsWidth / ALBUMSCOUNT;
}

export function getAlbumHeight(visualsWidth) {
  const verticalPadding = getVerticalPadding(visualsWidth);
  const infoHeight = getInfoHeight(visualsWidth);
  return getCoverSize(visualsWidth) + verticalPadding + infoHeight;
}
