import React, { useEffect } from "react";
import { Audioset } from "../../audioset";
import { Scroll } from "../shared/Scroll";
import { usePlayer } from "../components/Player/usePlayer";
import { Controller } from "../components/Player/Controller";
import { useFullscreen } from "../components/Player/useFullscreen";
import { useKeyboardListener } from "../components/Player/useKeyboardListener";
import { autoUnlockAudio } from "../../active-audio-context";
import { Footer } from "../components/Player/Footer";
import { SampleBuffers } from "../../sampler";
import { ArrowLeft } from "../shared/Icons";
import { Spinner } from "../shared/Spinner";

type Props = {
  ready: boolean;
  audioset: Audioset;
  buffers: SampleBuffers;
  onStop: () => void;
};

const PlayerPage: React.FC<Props> = ({ ready, audioset, buffers, onStop }) => {
  const player = usePlayer(audioset, buffers);
  const { toggleFullscreen } = useFullscreen();
  useKeyboardListener(player.control?.keyboard);

  useEffect(() => autoUnlockAudio(), []);
  return (
    <div className="App Audioset">
      <div className="Header">
        <button className="navigation" onClick={onStop}>
          <ArrowLeft />
          <h1>{audioset.meta.title}</h1>
        </button>
      </div>
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
      <Footer
        onFullscreen={toggleFullscreen}
        onStopAll={() => player?.control?.stopAll(0)}
      />
      <div className="visuals">
        <div className="visuals-display" ref={player.visualsRef} />
      </div>
    </div>
  );
};

export default PlayerPage;
