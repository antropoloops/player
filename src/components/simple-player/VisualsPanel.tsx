import React from "react";
import useDimensions from "react-cool-dimensions";
import { Audioset, Clip } from "../../audioset";
import { State4 } from "../../player4";
import Spinner from "../Spinner";

type Props = {
  audioset: Audioset;
  state: State4;
};

const SimplePanelVisuals: React.FC<Props> = ({ audioset, state }) => {
  const { ref, width } = useDimensions<HTMLImageElement>();
  if (audioset.visuals.mode !== "panel") return null;

  const ratio = width / audioset.visuals.image.size.width;
  const clipById = audioset.index.clipById;

  const { clips } = state.status;

  const radius = Math.floor(120 * ratio);

  return (
    <div className="h-full w-full flex flex-col items-start relative">
      <img ref={ref} src={audioset.visuals.image.url} alt="fondo" />
      {Object.keys(clips).map((clipId) =>
        clips[clipId]?.playing ? (
          <PlayingClip
            key={clipId}
            clip={clipById[clipId]}
            ratio={ratio}
            radius={radius}
          />
        ) : null
      )}
    </div>
  );
};

export default SimplePanelVisuals;

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
