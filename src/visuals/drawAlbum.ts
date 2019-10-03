import { Clip } from "../Audioset";
import {
  getCoverSize,
  getHorizontalPadding,
  getInfoHeight,
  getVerticalPadding,
} from "./dimensions";

export default function drawAlbum(el: any, width: number, clip: Clip) {
  const trackNumber = clip.trackNum;
  const imageUrl = clip.resources.cover.small;
  const country = clip.country;
  const trackColor = clip.color;
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

  function wrap(textElement: any, textId: any) {
    // FIXME: don't use document
    const danger = document.getElementById(textId) as any;
    if (!danger) {
      return;
    }
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
