/**
 * Draw the panel (in PanelMetadata)
 */
export function drawPanel(
  container: any,
  width: number,
  height: number,
  imageUrl: string,
) {
  container
    .append("svg:image")
    .attr("xlink:href", imageUrl)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "xMinYMin meet");
}

export function createPanelProjector(
  containerWidth: number,
  containerHeight: number,
  realImageWidth: number,
  realImageHeight: number,
) {
  const containerRatio = containerWidth / containerHeight;
  const imageRatio = realImageWidth / realImageHeight;
  return ([x, y]: [number, number]) => {
    const xPos =
      containerRatio > imageRatio
        ? (x / realImageWidth) * containerHeight * imageRatio
        : (x / realImageWidth) * containerWidth;

    const yPos =
      containerRatio > imageRatio
        ? (y / realImageHeight) * containerHeight
        : (y / realImageHeight) * (containerWidth / imageRatio);
    return [xPos, yPos];
  };
}
