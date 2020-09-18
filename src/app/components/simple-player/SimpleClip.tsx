import React, { useState } from "react";
import { Clip as ClipData } from "../../../audioset";
import cc from "classcat";

import { PlayStatus } from "../../simplePlayer/types";
import { KeyboardController } from "../../../player/Control";
import ClipKeyBinding from "./ClipKeyBinding";
import Audio from "./Audio";

type Props = {
  className?: string;
  keyboard: KeyboardController;
  clip: ClipData;
  status: PlayStatus;
  onClick: () => void;
  isStream: boolean;
};

const Clip: React.FC<Props> = ({
  className,
  clip,
  onClick,
  status,
  keyboard,
  isStream,
}) => {
  const [ready, setReady] = useState(false);
  return (
    <button
      disabled={!ready}
      className={cc([
        className,
        "w-full flex text-gray-dark",
        "focus:outline-none",
        status.dirty && "animate-ping",
        status.playing ? "items-stretch" : "items-center",
      ])}
      style={{ backgroundColor: clip.color }}
    >
      <Audio
        isStream={isStream}
        audio={clip.resources.audio}
        status={status}
        onStateChange={setReady}
        onEnded={onClick}
      />
      <div
        className={cc([
          "ratio bg-gray-dark bg-opacity-50",
          status.playing ? "w-1/2" : "w-cover-mini",
        ])}
        onClick={onClick}
      >
        <svg viewBox="0 0 1 1" />
        <img
          className={cc([ready ? "opacity-100" : "opacity-25"])}
          alt={clip.title}
          src={clip.resources.cover.small}
        />
      </div>
      {status.playing ? (
        <div className="ml-2 text-left w-full" onClick={onClick}>
          <div className="font-medium">{clip.title}</div>
          <div className="italic">{clip.album}</div>
          <div>{clip.artist}</div>
        </div>
      ) : (
        <div className="w-full flex text-left">
          <h3 className="ml-2 flex-grow" onClick={onClick}>
            {clip.title}
          </h3>
          <ClipKeyBinding clipId={clip.id} keyboard={keyboard} />
        </div>
      )}
    </button>
  );
};
export default Clip;
