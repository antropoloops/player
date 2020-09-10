import React from "react";
import useDimensions from "react-cool-dimensions";
import { Audioset, Clip } from "../../../audioset";
import Spinner from "../Spinner";

type Props = {
  audioset: Audioset;
  activeClipIds: string[];
};

const PanelVisuals: React.FC<Props> = ({ audioset, activeClipIds }) => {
  const { ref, width } = useDimensions<HTMLImageElement>();
  if (audioset.visuals.mode !== "panel") return null;

  const ratio = width / audioset.visuals.image.size.width;

  const radius = Math.floor(120 * ratio);

  return (
    <div className="h-full w-full flex flex-col items-start relative">
      <img ref={ref} src={audioset.visuals.image.url} alt="fondo" />
      {activeClipIds.map((clipId) => {
        const clip = audioset.index.clipById[clipId];
        return clip ? (
          <PlayingClip
            key={clip.id}
            clip={clip}
            ratio={ratio}
            radius={radius}
          />
        ) : null;
      })}
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
