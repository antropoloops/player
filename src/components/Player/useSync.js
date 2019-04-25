import { useEffect, useMemo } from "react";
import createSync, { receiveAction, start, stop } from "../../lib/sync";
import createChannelEffects from "../../lib/channel";
import createAudio, { currentTime, initAudio } from "../../lib/audio";
import createKeyboardEffects from "../../lib/keyboard";
import { fetchAudio, preloadImages } from "../../lib/audioset";

export default function useSync(audioset) {
  console.log("joder", audioset);
  const setState = state => console.log("SYNC state", state);
  const sync = useMemo(() => createSync(audioset, setState, currentTime), [
    audioset
  ]);

  useEffect(() => {
    console.log("attach sync");
    const { dispatch, addEffect } = sync;
    createKeyboardEffects(audioset, {
      onPress: pressed => dispatch(start(pressed.clipId)),
      onRelease: released => dispatch(stop(released.clipId))
    });
    addEffect(() => {
      return createChannelEffects(audioset, (action, userId) =>
        dispatch(receiveAction(action, userId))
      );
    });
    initAudio().then(ctx =>
      Promise.all([fetchAudio(ctx, audioset), preloadImages(audioset)]).then(
        () => createAudio(audioset).then(addEffect)
      )
    );

    return sync.detach;
  }, [audioset, sync]);

  return sync;
}
