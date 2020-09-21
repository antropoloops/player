import { useCallback, useEffect, useReducer } from "react";
import { Audioset } from "../audioset";
import { reducer, createInitialState, PlayerState } from "../player";
import { PlayerEvent } from "../player/events";
import useAudioContext from "./useAudioContext";

const INTERVAL_MS = 100;
const INTERVAL_SECS = INTERVAL_MS / 1000;

function useSimplePlayer(
  audioset?: Audioset
): [PlayerState, (event: PlayerEvent) => void] {
  const context = useAudioContext();
  const [state, dispatch] = useReducer(reducer, createInitialState());

  useEffect(() => {
    dispatch({ type: "init", audioset });
  }, [dispatch, audioset]);

  useEffect(() => {
    const id = setInterval(
      () =>
        dispatch({
          type: "tick",
          time: context?.currentTime || 0,
          length: INTERVAL_SECS,
        }),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [dispatch, context]);

  const schedule = useCallback(
    (event: PlayerEvent) => {
      dispatch({
        type: "event",
        event,
      });
      dispatch({
        type: "tick",
        time: context?.currentTime || 0,
        length: INTERVAL_SECS,
      });
    },
    [dispatch, context]
  );

  return [state, schedule];
}

export default useSimplePlayer;
