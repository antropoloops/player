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
  context,
  currentTime,
  unlockAudioContext,
  fetchAudioBuffers
} from "../../lib/audio";
import createKeyboardInput from "../../lib/keyboard";
import { preloadImages } from "../../lib/audioset";

const log = debug("atpls:useSync");

export default function useSync(audioset, onState) {
  const sync = useMemo(() => {
    const sync = createSync(audioset, currentTime);
    sync.keyboard = createKeyboardInput(audioset);
    return sync;
  }, [audioset]);

  useEffect(() => {
    attachSync(sync, audioset, onState);
    const ctx = context();
    const detach = sync.keyboard.attach({
      onPress: clipId => sync.dispatch(start(clipId, ctx.currentTime)),
      onRelease: clipId => sync.dispatch(stop(clipId, ctx.currentTime))
    });
    sync.dispatch(stopAll());
    return () => {
      sync.detach();
      detach();
    };
  }, [audioset, sync, onState]);

  return sync;
}

function attachSync(sync, audioset, onState) {
  log("Attach sync");
  const { dispatch, addEffect, subscribe, events } = sync;
  subscribe(state => log("STATE", state));
  onState && subscribe(onState);
  addEffect(
    createChannelEffects(audioset, (action, userId) =>
      dispatch(receiveAction(action, userId))
    )
  );
  unlockAudioContext().then(ctx => {
    Promise.all([
      fetchAudioBuffers(ctx, audioset, events),
      preloadImages(audioset)
    ])
      .then(() => createAudioEffects(audioset))
      .then(addEffect);
  });
}
