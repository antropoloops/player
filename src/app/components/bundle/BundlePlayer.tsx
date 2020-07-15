import React, { useState, useEffect } from "react";
import { Audioset } from "../../../audioset";
import { PlayerComponentState } from "../../hooks/usePlayer";
import { Controller } from "../Player/Controller";
import AudiosetConfig from "../AudiosetConfig";
import Collapsable from "../Collapsable";
import { ArrowDown, ArrowUp } from "../Icons";
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

  // return (
  //   <div className="App Audioset">
  //     <Prompt when={isPlaying} message={() => f("ask-leave-player")} />
  //     <div className="Header">
  //       <button
  //         className="p-2 flex w-full items-center rounded-lg text-white hover:text-white-light focus:outline-none duration-300 transition-medium"
  //         onClick={() => setConfigOpen(!isConfigOpen)}
  //       >
  //         <h1 className="flex-grow">{audioset.meta.title}</h1>
  //         {isConfigOpen ? (
  //           <ArrowUp className="text-gray-light" />
  //         ) : (
  //           <ArrowDown className="text-gray-light" />
  //         )}
  //       </button>
  //       <Collapsable isOpen={isConfigOpen}>
  //         <AudiosetConfig
  //           onClose={() => setConfigOpen(false)}
  //           onStop={() => player.control?.stopAll(0)}
  //           onQuit={onStop}
  //         />
  //       </Collapsable>
  //     </div>
  //     <div className="Content">
  //       <Controller
  //         audioset={audioset}
  //         state={player.state}
  //         control={player.control}
  //         onResume={() => undefined}
  //       />
  //     </div>
  //     <div className="visuals">
  //       {active ? (
  //         <div className="visuals-display" ref={player.visualsRef} />
  //       ) : (
  //         <div className="w-full h-full flex justify-center items-center py-20">
  //           <button
  //             className="p-2 rounded-full bg-green focus:outline-none"
  //             title="Start playing"
  //           >
  //             <img
  //               width="105"
  //               height="32"
  //               className="h-8"
  //               src="/play.png"
  //               alt="Start"
  //             />
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default BundlePlayer;
