import React, { useEffect, useState, useMemo } from "react";
import { Audioset } from "../../audioset";
import PlayerPage from "./PlayerPage";
import PreviewPage from "./PreviewPage";
import { ResourceLoader } from "../../player/Loader";
import {
  getActiveAudioContext,
  autoUnlockAudio,
} from "../../active-audio-context";

type Props = {
  audioset: Audioset;
};

const AudiosetPage: React.FC<Props> = ({ audioset }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const resources = useMemo<ResourceLoader>(
    () =>
      new ResourceLoader(audioset, (status) => {
        if (status.stage === "ready") {
          setLoaded(true);
        }
      }),
    [audioset]
  );
  // const loading = started && !loaded;

  async function startLoading() {
    if (!started) {
      setStarted(true);
      const ctx = await getActiveAudioContext();
      await resources.load(ctx);
    }
  }

  useEffect(() => {
    setPlaying(false);
  }, [audioset]);

  useEffect(() => autoUnlockAudio(), []);

  return isPlaying ? (
    <PlayerPage
      ready={loaded}
      audioset={audioset}
      buffers={resources}
      onStop={() => setPlaying(false)}
    />
  ) : (
    <PreviewPage
      audioset={audioset}
      onStart={() => {
        startLoading();
        setPlaying(true);
      }}
    />
  );
};

export default AudiosetPage;
