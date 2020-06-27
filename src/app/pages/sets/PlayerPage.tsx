import React, { useState } from "react";
import { Audioset } from "../../../audioset";
import { PlayerComponentState } from "../../hooks/usePlayer";
import { Controller } from "../../components/Player/Controller";
import AudiosetConfig from "../../components/AudiosetConfig";
import Collapsable from "../../components/Collapsable";
import { GearIcon } from "../../components/Icons";

type Props = {
  ready: boolean;
  audioset: Audioset;
  onStop: () => void;
  player: PlayerComponentState;
};

const PlayerPage: React.FC<Props> = ({ ready, audioset, player, onStop }) => {
  const [configOpen, setConfigOpen] = useState(false);

  return (
    <div className="App Audioset">
      <div className="Header">
        <button
          className="p-2 flex w-full items-center rounded-lg text-white hover:text-white-light focus:outline-none duration-300 transition-medium"
          onClick={() => setConfigOpen(!configOpen)}
        >
          <h1 className="flex-grow">{audioset.meta.title}</h1>
          <GearIcon className="" />
        </button>
        <Collapsable isOpen={configOpen}>
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
        <div className="visuals-display" ref={player.visualsRef} />
      </div>
    </div>
  );
};

export default PlayerPage;
