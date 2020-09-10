import React, { useState, useEffect } from "react";
import Spinner from "../Spinner";
import { ReactComponent as PlayIcon } from "../../assets/play-circle.svg";
import { Clip } from "../../../audioset";
import { AudioSampler } from "../../hooks/useAudioSampler";
import { ClipState } from "./player";

export type ClipProps = {
  clip: Clip;
  color: string;
  keyboard: string;
  state?: ClipState;
  sampler: AudioSampler;

  toggle: () => void;
};

const ClipView: React.FC<ClipProps> = ({
  clip,
  color,
  keyboard,
  state,
  toggle,
  sampler,
}) => {
  const [hover, setHover] = useState(false);

  const isRunning = state?.state === "start";

  useEffect(() => {
    if (state) {
      const sample = sampler.clips[clip.id];
      if (state.state === "start") sample.start(state.time);
      else if (state.state === "stop") sample.stop(state.time);
    }
  }, [state, sampler, clip.id]);

  return (
    <button
      key={clip.id}
      className="ml-2 w-1/6 ratio rounded overflow-hidden relative"
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        className={isRunning ? "opacity-75" : "opacity-100"}
        alt="cover"
        width="300"
        height="300"
        src={clip.resources.cover.thumb}
      />
      <svg viewBox="0 0 1 1" />
      <div className="absolute inset-0 flex items-center justify-center">
        {hover ? (
          isRunning ? (
            <div className="w-6 h-6 bg-black rounded-sm" />
          ) : (
            <PlayIcon className="w-12 h-12 text-black mt-2" />
          )
        ) : isRunning ? (
          <Spinner color={color} />
        ) : (
          <div className="text-white bg-black w-8 h-8 uppercase rounded-full leading-8 text-center opacity-50">
            {keyboard}
          </div>
        )}
      </div>
    </button>
  );
};
export default ClipView;
