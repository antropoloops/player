import { useEffect, useState } from "react";
import { AudiosetLoadStatus } from "../audioset/AudiosetLoader";
import { player } from "../player";

export function useAudiosetLoadStatus(audiosetId: string): AudiosetLoadStatus {
  const [loadStatus, setLoadStatus] = useState<AudiosetLoadStatus>({
    status: "loading",
    audiosetId,
  });
  useEffect(() => {
    player.loader
      .loadAudioset(audiosetId)
      .then(status => setLoadStatus(status))
      .catch(error => setLoadStatus({ status: "error", error }));
  }, [audiosetId]);

  return loadStatus;
}
