import React, { useCallback, useEffect, useState } from "react";
import { Clip as ClipData } from "../../../audioset";
import cc from "classcat";
import { decodeAudioBuffer } from "../../../player/Loader/decodeAudioBuffer";
import { getActiveAudioContext } from "../../../lib/active-audio-context";
import { IAudioContext } from "standardized-audio-context";
import { PlayStatus } from "../../simplePlayer/types";

type Props = {
  clip: ClipData;
  status: PlayStatus;
  onClick: () => void;
};

const Clip: React.FC<Props> = ({ clip, onClick, status }) => {
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
        "w-full flex text-gray-dark",
        "focus:outline-none",
        status.dirty && "animate-ping",
        status.playing ? "items-stretch" : "items-center",
      ])}
      onClick={onClick}
      style={{ backgroundColor: clip.color }}
    >
      <img
        className={cc([
          status.playing ? "w-1/2" : "w-2/12",
          ready ? "opacity-100" : "opacity-25",
        ])}
        alt={clip.title}
        src={clip.resources.cover.small}
      />
      {status.playing ? (
        <div className="ml-2 text-left w-full">
          <div className="font-medium">{clip.title}</div>
          <div className="italic">{clip.album}</div>
          <div>{clip.artist}</div>
        </div>
      ) : (
        <h3 className="ml-2">{clip.title}</h3>
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
