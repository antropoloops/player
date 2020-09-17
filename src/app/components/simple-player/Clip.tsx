import React, { useCallback, useEffect, useState } from "react";
import { Clip as ClipData } from "../../../audioset";
import { PlayStatus } from "../../hooks/useSimplePlayer";
import cc from "classcat";
import { decodeAudioBuffer } from "../../../player/Loader/decodeAudioBuffer";
import { getActiveAudioContext } from "../../../lib/active-audio-context";
import { IAudioContext } from "standardized-audio-context";

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
        "flex w-full mb-1 focus:outline-none",
        status.dirty && "animate-pulse",
      ])}
      onClick={onClick}
    >
      <img
        className={cc([
          status.playing ? "w-1/2" : "w-1/4",
          ready ? "opacity-100" : "opacity-25",
        ])}
        alt={clip.title}
        src={clip.resources.cover.small}
      />
      <pre>{JSON.stringify(status)}</pre>
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
      source.start(time);

      return () => source.stop();
    },
    [sample]
  );

  return { ready, play };
}
