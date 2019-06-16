export function drawPanel(container, width, height, imageUrl) {
  container
    .append("svg:image")
    .attr("xlink:href", imageUrl)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "xMinYMin meet");
}

export function getPosition(
  containerWidth,
  containerHeight,
  realImageWidth,
  realImageHeight
) {
  const containerRatio = containerWidth / containerHeight;
  const imageRatio = realImageWidth / realImageHeight;
  return function([x, y]) {
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
