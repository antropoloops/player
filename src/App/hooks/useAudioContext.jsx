import { useEffect } from "react";
import { initAudio, getContext } from "../../lib/audio";
export function useAudioContext(onContext) {
  useEffect(() => {
    initAudio().then(onContext);
  }, [onContext]);
  return getContext();
}
