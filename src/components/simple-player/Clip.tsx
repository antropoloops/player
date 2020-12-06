import React, { useState } from "react";
import cc from "classcat";
import { Clip as ClipData } from "../../audioset";
import ClipKeyBinding from "./ClipKeyBinding";
import { ClipStatus4, KeyboardController } from "../../player4";
import Audio from "./Audio";

type Props = {
  className?: string;
  keyboard: KeyboardController;
  clip: ClipData;
  status: ClipStatus4;
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
    <div
      className={cc([
        className,
        "w-full flex text-gray-dark overflow-hidden",
        "focus:outline-none cursor-pointer",
        status.dirty && "animate-ping-slow",
        "items-stretch",
      ])}
      style={{ backgroundColor: clip.color }}
    >
      <div
        className={cc([
          "ratio bg-gray-dark bg-opacity-50 flex-shrink-0",
          status.playing ? "w-1/2" : "w-cover-mini",
        ])}
        onClick={onClick}
      >
        <svg viewBox="0 0 1 1" />
        {clip.resources.cover.small && (
          <img
            className={cc([ready ? "opacity-100" : "opacity-25"])}
            alt={clip.name}
            src={clip.resources.cover.small}
          />
        )}
      </div>
      {status.playing ? (
        <div
          className="flex flex-col ml-2 text-left flex-grow"
          onClick={onClick}
        >
          <div className="flex-grow">
            <div className="font-medium">{clip.title}</div>
            <div className="italic">{clip.album}</div>
            <div>{clip.artist}</div>
          </div>
          <div>{clip.name}</div>
        </div>
      ) : (
        <div className="flex-grow flex text-left items-stretch">
          <h3
            className="pl-2 flex items-center flex-grow truncate"
            onClick={onClick}
          >
            {clip.name}
          </h3>
          <div className="flex items-center flex-shrink-0">
            <ClipKeyBinding
              className="flex-shrink-0 m-1"
              clipId={clip.id}
              keyboard={keyboard}
            />
          </div>
        </div>
      )}
      <Audio
        isStream={isStream}
        audio={clip.resources.audio}
        status={status}
        onStateChange={setReady}
        onEnded={onClick}
      />
    </div>
  );
};
export default Clip;
