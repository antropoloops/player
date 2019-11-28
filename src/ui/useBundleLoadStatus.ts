import { useEffect, useState } from "react";
import { BundleLoadStatus } from "../audioset";
import { player } from "../player";

export function useBundleLoadStatus(audiosetId: string): BundleLoadStatus {
  const [loadStatus, setLoadStatus] = useState<BundleLoadStatus>({
    stage: "loading",
    payload: audiosetId,
  });
  useEffect(() => {
    player.loader
      .loadBundle(audiosetId)
      .then(status => setLoadStatus(status))
      .catch(error => setLoadStatus({ stage: "error", error }));
  }, [audiosetId]);

  return loadStatus;
}
