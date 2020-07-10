import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Audioset } from "../../../audioset";
import PlayerPage from "./PlayerPage";
import PreviewPage from "./PreviewPage";
import { ResourceLoader } from "../../../player/Loader";
import { getActiveAudioContext } from "../../../lib/active-audio-context";
import { usePlayer } from "../../hooks/usePlayer";
import { useKeyboardListener } from "../../hooks/useKeyboardListener";
import { Section } from "../../api/sections";

type Props = {
  section?: Section;
  audioset: Audioset;
};

const AudiosetPage: React.FC<Props> = ({ audioset, section }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const resources = useMemo<ResourceLoader>(() => {
    return new ResourceLoader(audioset, (status) => {
      if (status.stage === "ready") {
        setLoaded(true);
      }
    });
  }, [audioset]);
  // const loading = started && !loaded;
  const player = usePlayer(audioset, resources);
  useKeyboardListener(player.control?.keyboard);

  const startLoading = useCallback(async () => {
    const ctx = await getActiveAudioContext();
    await resources.load(ctx);
  }, [resources]);

  useEffect(() => {
    startLoading();
  }, [startLoading]);

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
      section={section}
      audioset={audioset}
      onStart={() => {
        startLoading();
        setPlaying(true);
      }}
    />
  );
};

export default AudiosetPage;
