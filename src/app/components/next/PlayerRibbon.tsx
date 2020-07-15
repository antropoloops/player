import React, { useReducer, useEffect, useState, useCallback } from "react";
import Layout from "../../components/layout/Layout";
import { Audioset } from "../../../audioset";
import Track from "./Track";
import player, { initialState, tick } from "./player";
import { getActiveAudioContext } from "../../../lib/active-audio-context";
import { IAudioContext } from "standardized-audio-context";

type Props = {
  audioset: Audioset;
};

const PlayerRibbon: React.FC<Props> = ({ audioset }) => {
  const [ctx, setContext] = useState<IAudioContext | null>(null);
  const [state, dispatch] = useReducer(player, initialState());

  const _tick = useCallback(() => {
    if (!ctx) return;
    const commands = tick(ctx.currentTime, state);
    if (commands.length) {
      dispatch({ type: "run", commands });
    }
  }, [ctx, state]);

  useEffect(() => {
    getActiveAudioContext().then(setContext);
  }, []);

  useEffect(() => {
    const id = setInterval(_tick, 100);
    return () => clearInterval(id);
  }, [_tick]);

  return (
    <Layout title={audioset ? audioset.meta.title : "Loading..."} backTo="/">
      <div className="h-full noselect">
        {!ctx && <div>Click to start</div>}
        {audioset?.tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            audioset={audioset}
            state={state.tracks[track.id] || {}}
            toggle={(clipId: string) =>
              dispatch({
                type: "trigger",
                trigger: "toggle",
                clipId,
                trackId: track.id,
              })
            }
          />
        ))}
      </div>
    </Layout>
  );
};
export default PlayerRibbon;
