import { useEffect } from "react";
import { context, unlockAudioContext } from "../../lib/audio";
export function useAudioContext(onContext) {
  useEffect(() => {
    unlockAudioContext();
  }, [onContext]);
  return context();
}
