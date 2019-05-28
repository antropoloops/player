import {
  getCoverSize,
  getHorizontalPadding,
  getVerticalPadding,
  getInfoHeight
} from "./dimensions";

export default function drawAlbum(el, width, params) {
  const { trackNumber, imageUrl, country, trackColor } = params;
  const album = el.append("g");
  const coverSize = getCoverSize(width);
  const horizontalPadding = getHorizontalPadding(width);
  const verticalPadding = getVerticalPadding(width);
  const infoHeight = getInfoHeight(width);
  const fontSize = "1.1vw";

  album
    .append("svg:image")
    .attr("width", coverSize)
    .attr("height", coverSize)
    .attr("x", trackNumber * coverSize)
    .attr("y", 0)
    .style("stroke", "white")
    .attr("xlink:href", imageUrl);

  // Draw country rectangle
  album
    .append("rect")
    .attr("width", coverSize)
    .attr("height", infoHeight)
    .attr("x", trackNumber * coverSize)
    .attr("y", coverSize + verticalPadding)
    .style("fill", trackColor);

  // Draw country text
  const countryText = album
    .append("text")
    .attr("id", "countryText" + trackNumber)
    .attr("x", trackNumber * coverSize + horizontalPadding)
    .attr("y", coverSize + verticalPadding + infoHeight / 2)
    .attr("dy", "0.35em")
    .style("font-size", fontSize)
    .text(country);

  // Trucate text larger than coverSize
  const countryTextId = "countryText" + trackNumber;
  function wrap(textElement, textId) {
    // FIXME: don't use document
    const danger = document.getElementById(textId);
    if (!danger) return;
    let textLength = danger.getBBox().width;
    let text = textElement.text();

    while (textLength > coverSize - horizontalPadding * 2 && text.length > 0) {
      text = text.slice(0, -1);
      textElement.text(text + "...");
      textLength = danger.getBBox().width;
    }
  }
  wrap(countryText, countryTextId);

  return album;
}
