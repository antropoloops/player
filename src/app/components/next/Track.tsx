import React, { useState } from "react";
import { Audioset, Track as TrackData } from "../../../audioset";
import { AudioSampler } from "../../hooks/useAudioSampler";
import Slider from "./Slider";
import { TrackState } from "./player";
import Clip from "./Clip";

export type Props = {
  audioset: Audioset;
  track: TrackData;
  state: TrackState;
  sampler: AudioSampler;
  toggle: (clipId: string) => void;
};

const Track: React.FC<Props> = ({
  track,
  audioset,
  toggle,
  state,
  sampler,
}) => {
  const [isOpen, setOpen] = useState(true);
  const [left, setLeft] = useState(30);

  const current = Object.values(state).find(
    (clipState) => clipState.state === "start"
  );

  // useEffect(() => {
  //   if (current) setOpen(false);
  // }, [current]);

  const label = track.name; // clipId ? audioset.index.clipById[clipId].title : track.name;

  return (
    <div className="flex p-2" style={{ backgroundColor: track.color }}>
      <button
        key={track.id}
        className="w-1/6 ratio bg-gray-light rounded bg-opacity-50 overflow-hidden"
        onClick={() => {
          current && setOpen(!isOpen);
        }}
      >
        {current && (
          <img
            alt="cover"
            width="300"
            height="300"
            src={audioset.index.clipById[current.clipId].resources.cover.thumb}
          />
        )}
        <svg viewBox="0 0 1 1" />
      </button>
      {isOpen ? (
        track.clipIds.map((id) => {
          const clip = audioset.index.clipById[id];
          return (
            <Clip
              key={id}
              clip={clip}
              sampler={sampler}
              color={track.color}
              state={state[id]}
              keyboard={clip.keyMap}
              toggle={() => toggle(id)}
            />
          );
        })
      ) : (
        <Slider label={label} left={left} onChange={setLeft} />
      )}
    </div>
  );
};

export default Track;
