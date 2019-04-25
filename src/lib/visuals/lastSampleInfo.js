import { getAlbumHeight } from "./dimensions";

export function createLastSampleInfo(
  parent,
  screenWidth,
  screenHeight,
  { title, artist, album, trackColor }
) {
  // Clear
  parent.select("#lastSampleInfoGroup").remove();
  const lastSampleInfo = parent.append("g").attr("id", "lastSampleInfoGroup");
  const rectSize = screenWidth / 20;
  const albumsHeight = getAlbumHeight(screenWidth);
  const horizontalPadding = screenWidth / 190;
  const verticalPadding = rectSize / 3;
  const x = screenWidth - rectSize;
  const y = screenHeight - albumsHeight - rectSize;
  const dy = "-0.35em";
  const fontSize = "1.1vw";

  lastSampleInfo
    .append("rect")
    .attr("width", rectSize)
    .attr("height", rectSize)
    .attr("x", x)
    .attr("y", y)
    .style("fill", trackColor);

  lastSampleInfo
    .append("text")
    .attr("x", x + horizontalPadding)
    .attr("y", y + verticalPadding * 1)
    .attr("dy", dy)
    .attr("font-size", fontSize)
    .text("title");

  lastSampleInfo
    .append("text")
    .attr("x", x - horizontalPadding)
    .attr("y", y + verticalPadding * 1)
    .attr("dy", dy)
    .attr("font-size", fontSize)
    .style("text-anchor", "end")
    .style("fill", "#e6e6e6")
    .text(title);

  lastSampleInfo
    .append("text")
    .attr("x", x + horizontalPadding)
    .attr("y", y + verticalPadding * 2)
    .attr("dy", dy)
    .attr("font-size", fontSize)
    .text("artist");

  lastSampleInfo
    .append("text")
    .attr("x", x - horizontalPadding)
    .attr("y", y + verticalPadding * 2)
    .attr("dy", dy)
    .attr("font-size", fontSize)
    .style("text-anchor", "end")
    .style("fill", "#e6e6e6")
    .text(artist);

  lastSampleInfo
    .append("text")
    .attr("x", x + horizontalPadding)
    .attr("y", y + verticalPadding * 3)
    .attr("dy", dy)
    .attr("font-size", fontSize)
    .text("album");

  lastSampleInfo
    .append("text")
    .attr("x", x - horizontalPadding)
    .attr("y", y + verticalPadding * 3)
    .attr("dy", dy)
    .attr("font-size", fontSize)
    .style("text-anchor", "end")
    .style("fill", "#e6e6e6")
    .text(album);

  return lastSampleInfo;
}
