import React, { useEffect } from "react";
import { Audioset } from "../../../audioset";
import { PlayerComponentState } from "../../hooks/usePlayer";
import { Controller } from "../Player/Controller";
import { Prompt } from "react-router-dom";
import useLocale from "../../hooks/useLocale";
import Layout from "../layout/Layout";
import BackToLink from "../BackToLink";
import { useDeviceType } from "../../hooks/useDeviceType";

type Props = {
  active: boolean;
  loaded: boolean;
  audioset: Audioset;
  onStop: () => void;
  player: PlayerComponentState;
};

const BundlePlayer: React.FC<Props> = ({
  audioset,
  player,
  active,
  onStop,
}) => {
  const { isDesktop } = useDeviceType();
  const { formatMessage: f } = useLocale();

  const isPlaying = !!Object.values(player.state.tracks).find(
    (track) => track.status === "playing"
  );

  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

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
      <Prompt when={isPlaying} message={() => f("ask-leave-player")} />
      {isDesktop && (
        <BackToLink
          to={audioset.meta.parent_path}
          label={audioset.meta.title}
        />
      )}
      <Controller
        audioset={audioset}
        state={player.state}
        control={player.control}
        onResume={() => undefined}
      />
    </Layout>
  );
};

export default BundlePlayer;
