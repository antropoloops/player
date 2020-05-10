import React, { useState } from "react";
import { Audioset } from "../../audioset";
import { Scroll } from "../components/Scroll";
import { PlayerComponentState } from "../components/Player/usePlayer";
import { Controller } from "../components/Player/Controller";
import { ArrowUp, ArrowDown } from "../components/Icons";
import { Spinner } from "../components/Spinner";
import ConfigPage from "../components/AudiosetConfig";

type Props = {
  ready: boolean;
  audioset: Audioset;
  onStop: () => void;
  player: PlayerComponentState;
};

const PlayerPage: React.FC<Props> = ({ ready, audioset, player, onStop }) => {
  const [isConfig, setIsConfig] = useState(false);

  return (
    <div className="App Audioset">
      <div className="Header overflow-hidden">
        <button
          className="p-2 flex shadow-none outline-none w-full items-center rounded-lg text-gray-light"
          onClick={() => setIsConfig(!isConfig)}
        >
          <h1 className="flex-grow text-white text-light">
            {audioset.meta.title}
          </h1>
          <svg
            className={`fill-current h-4 w-4
            transform duration-300 ${
              isConfig
                ? "-rotate-90 ease-out transition-medium"
                : "rotate-0 ease-in transition-medium"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {isConfig ? (
        <ConfigPage
          onClose={() => setIsConfig(false)}
          onStop={() => player.control?.stopAll(0)}
          onQuit={onStop}
        />
      ) : (
        <Scroll>
          <div className="content">
            {!ready && <Spinner center="horizontal" />}
            <Controller
              audioset={audioset}
              state={player.state}
              control={player.control}
              onResume={() => undefined}
            />
          </div>
        </Scroll>
      )}
      <div className="visuals">
        <div className="visuals-display" ref={player.visualsRef} />
      </div>
    </div>
  );
};

export default PlayerPage;
