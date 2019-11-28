import { useEffect, useState } from "react";
import { AudiosetLoadStatus } from "../audioset/AudiosetLoader";
import { player } from "../player";

export function useAudiosetLoadStatus(audiosetId: string): AudiosetLoadStatus {
  const [loadStatus, setLoadStatus] = useState<AudiosetLoadStatus>({
    stage: "loading",
    payload: audiosetId,
  });
  useEffect(() => {
    player.loader
      .loadAudioset(audiosetId)
      .then(status => setLoadStatus(status))
      .catch(error => setLoadStatus({ stage: "error", error }));
  }, [audiosetId]);

  return loadStatus;
}
