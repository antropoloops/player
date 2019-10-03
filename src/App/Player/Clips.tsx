import React, { useEffect, useState } from "react";
import { Audioset } from "../../Audioset";
import { player } from "../../Player";
import { ControlState } from "../../Player/AudiosetControl";
import { Clip } from "./Clip";

interface ClipsProps {
  audioset: Audioset;
}

export const Clips = ({ audioset }: ClipsProps) => {
  const state = useControlState();

  if (!audioset || !audioset.tracks) {
    return <></>;
  }

  return (
    <div className="Clips">
      {audioset.tracks.map(track => (
        <div
          key={track.id}
          className="Track"
          style={{ backgroundColor: track.color }}
        >
          <h2 className="title">{track.name}</h2>
          {track.clipIds.map(clipId => (
            <Clip
              key={clipId}
              clip={audioset.index.clipById[clipId]}
              isActive={state.clips[clipId].state === "playing"}
              onClick={() => player.control.toggleClip(clipId, 0)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

function useControlState(): ControlState {
  const [state, setState] = useState(player.control.getState());
  useEffect(() =>
    player.onControlStateChanged(controlState => {
      setState(controlState);
    }),
  );
  return state;
}
