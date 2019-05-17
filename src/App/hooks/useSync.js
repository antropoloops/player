import { useEffect, useMemo } from "react";
import createSync, {
  receiveAction,
  start,
  stop,
  stopAll
} from "../../lib/sync";
import createChannelEffects from "../../lib/channel";
import createAudio, { currentTime, initAudio } from "../../lib/audio";
import createKeyboardEffects from "../../lib/keyboard";
import { fetchAudio, preloadImages } from "../../lib/audioset";

export default function useSync(audioset, onState) {
  const sync = useMemo(() => createSync(audioset, currentTime), [audioset]);

  useEffect(() => {
    attachSync(sync, audioset, onState);
    sync.dispatch(stopAll());
    return sync.detach;
  }, [audioset, sync, onState]);

  return sync;
}

function attachSync(sync, audioset, onState) {
  console.log("attach sync");
  const { dispatch, addEffect, subscribe } = sync;
  subscribe(state => console.log("SYNC state", state));
  onState && subscribe(onState);
  createKeyboardEffects(audioset, {
    onPress: pressed => dispatch(start(pressed.clipId)),
    onRelease: released => dispatch(stop(released.clipId))
  });
  addEffect(() => {
    return createChannelEffects(audioset, (action, userId) =>
      dispatch(receiveAction(action, userId))
    );
  });
  initAudio().then(
    ctx =>
      console.log("fetch audio files...") ||
      Promise.all([fetchAudio(ctx, audioset), preloadImages(audioset)]).then(
        () => createAudio(audioset).then(addEffect)
      )
  );
}
