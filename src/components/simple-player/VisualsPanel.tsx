import classcat from "classcat";
import React from "react";
import useDimensions from "react-cool-dimensions";
import { Audioset, Clip, Track } from "../../audioset";
import { useDeviceType } from "../../hooks/useDeviceType";
import { State4 } from "../../player4";
import Spinner from "../Spinner";

type TrackHeaderProps = {
  track: Track;
  clip?: Clip;
  labels?: boolean;
};
const TrackHeader: React.FC<TrackHeaderProps> = ({ track, clip, labels }) => (
  <div>
    {clip ? (
      <img src={clip.resources.cover.small} alt={clip.name} />
    ) : (
      <div className="ratio">
        <svg viewBox="0 0 1 1" />
      </div>
    )}

    <div
      className={classcat(["w-full px-1 truncate", labels ? "mt-1" : "h-1"])}
      style={clip ? { backgroundColor: track.color } : undefined}
    >
      {clip?.name} &nbsp;
    </div>
  </div>
);

type Props = {
  audioset: Audioset;
  state: State4;
};

const SimplePanelVisuals: React.FC<Props> = ({ audioset, state }) => {
  const { ref, width } = useDimensions<HTMLImageElement>();
  const { isDesktop } = useDeviceType();
  if (audioset.visuals.mode !== "panel") return null;

  const ratio = width / audioset.visuals.image.size.width;
  const clipById = audioset.index.clipById;

  const { clips } = state.status;

  const playingClips = Object.keys(clips)
    .filter((clipId) => clips[clipId]?.playing)
    .map((clipId) => clipById[clipId]);

  const radius = Math.floor(120 * ratio);

  return (
    <div className="h-full w-full flex flex-col items-start">
      <div className="w-full grid grid-cols-8">
        {audioset.tracks.map((track) => (
          <TrackHeader
            key={track.id}
            track={track}
            clip={playingClips.find((clip) => clip.trackId === track.id)}
            labels={isDesktop}
          />
        ))}
      </div>

      <div className="relative">
        <img ref={ref} src={audioset.visuals.image.url} alt="fondo" />
        {playingClips.map((clip) => (
          <PlayingClip
            key={clip.id}
            clip={clip}
            ratio={ratio}
            radius={radius}
          />
        ))}
      </div>
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
