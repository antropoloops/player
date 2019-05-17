import { useEffect } from "react";
import { initAudio } from "../../lib/audio";
export function useAudioContext(onContext) {
  useEffect(() => {
    initAudio().then(onContext);
  }, [onContext]);
}
