import React, { useState, useMemo, useCallback, useEffect } from "react";
import { ResourceLoader } from "../../../player/Loader";
import {
  getActiveAudioContext,
  isAudioContextActive,
} from "../../../lib/active-audio-context";
import { usePlayer } from "../../hooks/usePlayer";
import { useKeyboardListener } from "../../hooks/useKeyboardListener";
import { Props } from "../bundle/AudiosetBundle";
import { useDeviceType } from "../../hooks/useDeviceType";
import useLocale from "../../hooks/useLocale";
import Layout from "../layout/Layout";
import PromptExit from "../shared/PromptExit";
import BackToLink from "../BackToLink";
import TrackList from "./TrackList";

const PlayMapScreen: React.FC<Props> = ({ audioset }) => {
  const { isDesktop } = useDeviceType();
  const { formatMessage: f } = useLocale();

  const [active, setActive] = useState(isAudioContextActive());
  const resources = useMemo<ResourceLoader>(() => {
    return new ResourceLoader(audioset, (status) => {
      if (status.stage === "ready") {
        // setLoaded(true)
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

  const isPlaying = !!Object.values(player.state.tracks).find(
    (track) => track.status === "playing"
  );

  return (
    <Layout
      title={audioset.meta.title}
      backTo={audioset.meta.parent_path}
      visuals={
        active ? (
          <div className="visuals-display" ref={player.visualsRef} />
        ) : (
          <div className="w-full h-full flex justify-center items-center py-20">
            <button
              className="p-2 rounded-full bg-green focus:outline-none"
              title="Start playing"
            >
              <img
                width="105"
                height="32"
                className="h-8"
                src="/play.png"
                alt="Start"
              />
            </button>
          </div>
        )
      }
    >
      <PromptExit when={isPlaying} message={f("ask-leave-player")} />
      {isDesktop && (
        <BackToLink
          to={audioset.meta.parent_path}
          label={audioset.meta.title}
        />
      )}
      <TrackList
        className="border-t-2 border-gray-dark"
        audioset={audioset}
        state={player.state}
        control={player.control}
        onResume={() => undefined}
      />
    </Layout>
  );
};

export default PlayMapScreen;
