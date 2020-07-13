import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Audioset } from "../../../audioset";
import BundlePlayer from "./BundlePlayer";
import { ResourceLoader } from "../../../player/Loader";
import { getActiveAudioContext } from "../../../lib/active-audio-context";
import { usePlayer } from "../../hooks/usePlayer";
import { useKeyboardListener } from "../../hooks/useKeyboardListener";
import { Section } from "../../api/sections";
import routes from "../../routes";
import ExplorePanel from "../explore/ExplorePanel";

type Props = {
  section?: Section;
  audioset: Audioset;
};

const AudiosetBundle: React.FC<Props> = ({ audioset, section }) => {
  const [isPlaying, setPlaying] = useState(true);
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

  if (!isPlaying) {
    return <Redirect to={routes.sets()} />;
  }

  const isMap = audioset.visuals.mode === "map";

  return isMap ? (
    <BundlePlayer
      ready={loaded}
      audioset={audioset}
      player={player}
      onStop={() => {
        setPlaying(false);
      }}
    />
  ) : (
    <ExplorePanel audioset={audioset} />
  );
};

export default AudiosetBundle;
