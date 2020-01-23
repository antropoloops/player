import { useMemo, useState } from "react";
import { Audioset } from "../../audioset";
import { getActiveAudioContext } from "../../player";
import { ResourceLoader } from "../../player/ResourceLoader";

export function useSession(audioset: Audioset) {
  const [isStarted, setStarted] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const loader = useMemo<ResourceLoader>(
    () =>
      new ResourceLoader(audioset, status => {
        if (status.stage === "ready") {
          setLoaded(true);
        }
      }),
    [audioset],
  );

  async function start() {
    setStarted(true);
    const ctx = await getActiveAudioContext();
    await loader.load(ctx);
  }

  return { isLoaded, isStarted, start, loader };
}
