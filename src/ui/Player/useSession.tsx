import { useEffect, useMemo, useState } from "react";
import { Audioset } from "../../audioset";
import { getActiveAudioContext } from "../../player/Audio";
import { ResourceLoader } from "../../player/Loader";
import { scrollToTop } from "../shared/useScroll";

export function useSession(audioset: Audioset) {
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const loader = useMemo<ResourceLoader>(
    () =>
      new ResourceLoader(audioset, status => {
        if (status.stage === "ready") {
          setLoaded(true);
        }
      }),
    [audioset],
  );
  const loading = started && !loaded;

  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (visible) {
      scrollToTop();
    }
  }, [visible]);

  async function start() {
    setVisible(false);
    if (!started) {
      setStarted(true);
      const ctx = await getActiveAudioContext();
      await loader.load(ctx);
    }
  }

  function toggle() {
    if (started) {
      setVisible(!visible);
    }
  }

  return { visible, loading, loaded, started, start, loader, toggle };
}
