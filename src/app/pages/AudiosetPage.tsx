import React, { useEffect, useState, useMemo } from "react";
import { Audioset } from "../../audioset";
import PlayerPage from "./PlayerPage";
import PreviewPage from "./PreviewPage";
import { ResourceLoader } from "../../player/Loader";
import {
  getActiveAudioContext,
  autoUnlockAudio,
} from "../../active-audio-context";
import { usePlayer } from "../components/Player/usePlayer";
import { useKeyboardListener } from "../components/Player/useKeyboardListener";

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
  const player = usePlayer(audioset, resources);
  useKeyboardListener(player.control?.keyboard);

  async function startLoading() {
    if (!started) {
      setStarted(true);
      const ctx = await getActiveAudioContext();
      await resources.load(ctx);
    }
  }

  useEffect(() => autoUnlockAudio(), []);

  return isPlaying ? (
    <PlayerPage
      ready={loaded}
      audioset={audioset}
      player={player}
      onStop={() => {
        setPlaying(false);
      }}
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
