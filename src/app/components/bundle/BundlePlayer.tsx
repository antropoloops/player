import React, { useState, useEffect } from "react";
import { Audioset } from "../../../audioset";
import { PlayerComponentState } from "../../hooks/usePlayer";
import { Controller } from "../Player/Controller";
import AudiosetConfig from "../AudiosetConfig";
import Collapsable from "../Collapsable";
import { ArrowDown, ArrowUp } from "../Icons";
import { Prompt } from "react-router-dom";
import useLocale from "../../hooks/useLocale";
import { isAudioContextActive } from "../../../lib/active-audio-context";

type Props = {
  ready: boolean;
  audioset: Audioset;
  onStop: () => void;
  player: PlayerComponentState;
};

const BundlePlayer: React.FC<Props> = ({ audioset, player, onStop }) => {
  const { formatMessage: f } = useLocale();
  const [isConfigOpen, setConfigOpen] = useState(false);

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
    <div className="App Audioset">
      <Prompt when={isPlaying} message={() => f("ask-leave-player")} />
      <div className="Header">
        <button
          className="p-2 flex w-full items-center rounded-lg text-white hover:text-white-light focus:outline-none duration-300 transition-medium"
          onClick={() => setConfigOpen(!isConfigOpen)}
        >
          <h1 className="flex-grow">{audioset.meta.title}</h1>
          {isConfigOpen ? (
            <ArrowUp className="text-gray-light" />
          ) : (
            <ArrowDown className="text-gray-light" />
          )}
        </button>
        <Collapsable isOpen={isConfigOpen}>
          <AudiosetConfig
            onClose={() => setConfigOpen(false)}
            onStop={() => player.control?.stopAll(0)}
            onQuit={onStop}
          />
        </Collapsable>
      </div>
      <div className="Content">
        <Controller
          audioset={audioset}
          state={player.state}
          control={player.control}
          onResume={() => undefined}
        />
      </div>
      <div className="visuals">
        {isAudioContextActive() ? (
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
        )}
      </div>
    </div>
  );
};

export default BundlePlayer;
