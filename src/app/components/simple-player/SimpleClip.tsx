import React, { useCallback, useEffect, useState } from "react";
import { Clip as ClipData } from "../../../audioset";
import cc from "classcat";
import { decodeAudioBuffer } from "../../../player/Loader/decodeAudioBuffer";
import { getActiveAudioContext } from "../../../lib/active-audio-context";
import { IAudioContext } from "standardized-audio-context";
import { PlayStatus } from "../../simplePlayer/types";
import { KeyboardController } from "../../../player/Control";
import ClipKeyBinding from "./ClipKeyBinding";

type Props = {
  className?: string;
  keyboard: KeyboardController;
  clip: ClipData;
  status: PlayStatus;
  onClick: () => void;
};

const Clip: React.FC<Props> = ({
  className,
  clip,
  onClick,
  status,
  keyboard,
}) => {
  const { ready, play } = useSample(clip.resources.audio.mp3);
  useEffect(() => {
    if (status.playing) {
      return play(status.time);
    }
  }, [play, status]);
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

type Sample = {
  context: IAudioContext;
  buffer: AudioBuffer;
};

async function loadAudio(url: string) {
  const context = await getActiveAudioContext();
  const response = await fetch(url);
  const buffer = await decodeAudioBuffer(response, context);

  return { context, buffer };
}

function useSample(src: string) {
  const [sample, setSample] = useState<Sample | null>(null);

  useEffect(() => {
    loadAudio(src).then(setSample);
  }, [src]);

  const ready = sample !== null;

  const play = useCallback(
    (time: number) => {
      if (!sample) return;

      const source = sample.context.createBufferSource();
      source.buffer = sample.buffer;
      source.connect(sample.context.destination);
      source.loop = true;
      source.start(time);

      return () => source.stop();
    },
    [sample]
  );

  return { ready, play };
}
