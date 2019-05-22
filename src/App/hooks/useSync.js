import debug from "debug";
import { useEffect, useMemo } from "react";
import createSync, {
  receiveAction,
  start,
  stop,
  stopAll
} from "../../lib/sync";
import createChannelEffects from "../../lib/channel";
import createAudioEffects, {
  currentTime,
  unlockAudioContext,
  fetchAudioBuffers
} from "../../lib/audio";
import createKeyboardEffects from "../../lib/keyboard";
import { preloadImages } from "../../lib/audioset";

const log = debug("atpls:useSync");

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
  const { dispatch, addEffect, subscribe, events } = sync;
  subscribe(state => log("STATE", state));
  onState && subscribe(onState);
  addEffect(() => {
    return createChannelEffects(audioset, (action, userId) =>
      dispatch(receiveAction(action, userId))
    );
  });
  unlockAudioContext().then(ctx => {
    Promise.all([
      fetchAudioBuffers(ctx, audioset, events),
      preloadImages(audioset)
    ])
      .then(() => createAudioEffects(audioset))
      .then(addEffect);

    createKeyboardEffects(audioset, {
      onPress: pressed => dispatch(start(pressed.clipId, ctx.currentTime)),
      onRelease: released => dispatch(stop(released.clipId, ctx.currentTime))
    });
  });
}
