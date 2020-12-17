import { useEffect, useState } from "react";
import { IAudioContext } from "standardized-audio-context";
import {
  getActiveAudioContext,
  autoUnlockAudio,
} from "../lib/active-audio-context";

export default function useAudioContext() {
  const [context, setContext] = useState<IAudioContext | null>(null);

  useEffect(() => {
    getActiveAudioContext().then(setContext);
    autoUnlockAudio();
  }, []);

  return context;
}
