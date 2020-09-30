import { useMemo, useReducer } from "react";
import { Audioset } from "../audioset";
import { reducer, createInitialState } from "../player4";
import useAudioContext from "./useAudioContext";

export default function usePlayer4(audioset: Audioset) {
  const [state, dispatch] = useReducer(reducer, createInitialState(audioset));
  const context = useAudioContext();

  const controller = useMemo(() => {
    const time = context?.currentTime || 0;
    return {
      startClip: (clipId: string) =>
        dispatch({ type: "clip:start", clipId, time }),
      stopClip: (clipId: string) =>
        dispatch({ type: "clip:stop", clipId, time }),
      stopTrack: (trackId: string) =>
        dispatch({ type: "track:stop", trackId, time }),
      stopAll: () => dispatch({ type: "all:stop", time }),
    };
  }, [dispatch, context]);

  return { state, controller };
}
