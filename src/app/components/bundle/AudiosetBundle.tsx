import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Audioset } from "../../../audioset";
import BundlePlayer from "./BundlePlayer";
import { ResourceLoader } from "../../../player/Loader";
import {
  getActiveAudioContext,
  isAudioContextActive,
} from "../../../lib/active-audio-context";
import { usePlayer } from "../../hooks/usePlayer";
import { useKeyboardListener } from "../../hooks/useKeyboardListener";
import { Section } from "../../api/sections";
import routes from "../../routes";
import ExplorePanel from "../explore/ExplorePanel";

type Props = {
  section?: Section;
  audioset: Audioset;
};

const AudiosetBundle: React.FC<Props> = ({ audioset }) => {
  const isMap = audioset.visuals.mode === "map";
  const isPoly =
    audioset.id === "voyager-pajaritos-audioset" ||
    audioset.id === "lacasaencendida2020";

  return isMap || isPoly ? (
    <MapAudiosetBundle audioset={audioset} />
  ) : (
    <ExplorePanel audioset={audioset} />
  );
};

export default AudiosetBundle;

const MapAudiosetBundle: React.FC<Props> = ({ audioset }) => {
  const [active, setActive] = useState(isAudioContextActive());
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
    setActive(true);
    await resources.load(ctx);
  }, [resources]);

  useEffect(() => {
    startLoading();
  }, [startLoading]);

  if (!isPlaying) {
    return <Redirect to={routes.sets()} />;
  }

  return (
    <BundlePlayer
      active={active}
      loaded={loaded}
      audioset={audioset}
      player={player}
      onStop={() => {
        setPlaying(false);
      }}
    />
  );
};
