import { useEffect, useReducer } from "react";
import { Audioset } from "../audioset";
import { reducer, createInitialState } from "../player";
import useAudioContext from "./useAudioContext";

const INTERVAL_MS = 100;
const INTERVAL_SECS = INTERVAL_MS / 1000;

function useSimplePlayer(audioset?: Audioset) {
  const context = useAudioContext();
  const stateAndDispatch = useReducer(reducer, createInitialState());
  const dispatch = stateAndDispatch[1];

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

  return stateAndDispatch;
}

export default useSimplePlayer;
