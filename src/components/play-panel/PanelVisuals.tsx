import React from "react";
import useDimensions from "react-cool-dimensions";
import { Audioset, Clip, safeFindClipById } from "../../audioset";
import Spinner from "../Spinner";

type Props = {
  audioset: Audioset;
  activeClipId?: string;
};

const PanelVisuals: React.FC<Props> = ({ audioset, activeClipId }) => {
  const { ref, width } = useDimensions<HTMLImageElement>();
  if (audioset.visuals.mode !== "panel") return null;

  const ratio = width / audioset.visuals.image.size.width;

  const clip = activeClipId && safeFindClipById(audioset, activeClipId);

  const radius = Math.floor(120 * ratio);

  return (
    <div className="h-full w-full flex flex-col items-start relative">
      <img ref={ref} src={audioset.visuals.image.url} alt="fondo" />
      {clip && <PlayingClip clip={clip} ratio={ratio} radius={radius} />}
    </div>
  );
};

export default PanelVisuals;

type PlayingClipProps = {
  clip: Clip;
  ratio: number;
  radius: number;
};

const PlayingClip: React.FC<PlayingClipProps> = ({ ratio, clip, radius }) => {
  const left = clip.position[0] * ratio - radius;
  const top = clip.position[1] * ratio - radius;
  const size = 2 * radius;

  return (
    <Spinner
      className="absolute spin"
      color={clip.color}
      style={{ left, top, width: size, height: size }}
    />
  );
};
