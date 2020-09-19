import { useEffect, useRef } from "react";
import { IAudioContext, IGainNode } from "standardized-audio-context";
import { getActiveAudioContext } from "../lib/active-audio-context";

let gain: IGainNode<IAudioContext> | undefined = undefined;

export default function useAudioOutput() {
  const ref = useRef(gain);
  useEffect(() => {
    if (gain) {
      ref.current = gain;
    } else {
      getActiveAudioContext().then((ctx) => {
        gain = ctx.createGain();
        gain.connect(ctx.destination);
        ref.current = gain;
      });
    }
  });

  const output = ref.current;

  return { output };
}
