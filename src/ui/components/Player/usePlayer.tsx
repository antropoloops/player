import { useCallback, useEffect, useState } from "react";
import { getActiveAudioContext } from "../../../active-audio-context";
import { Audioset } from "../../../audioset";
import {
  AudiosetControl,
  EmptyControlState,
  PlayerControl,
} from "../../../player/Control";
import { Effects } from "../../../player/Control";
import { SampleBuffers } from "../../../sampler";

export function usePlayer(audioset: Audioset, buffers: SampleBuffers) {
  // Make visuals render after reference is set: https://dev.to/thekashey/the-same-useref-but-it-will-callback-8bo
  const [el, setReference] = useState<HTMLDivElement | null>(null);
  const visualsRef = useCallback((newRef: HTMLDivElement) => {
    setReference(newRef);
  }, []);

  const [control, setControl] = useState<PlayerControl | undefined>();
  const [state, setState] = useState(EmptyControlState);

  useEffect(() => {
    let cancelled = false;
    let audio: Effects | undefined;
    let visuals: Effects | undefined;

    async function createControl() {
      const ctx = await getActiveAudioContext();

      if (cancelled) {
        return;
      }
      const { createAudioEffects } = await import(
        "../../../player/AudioEffects"
      );

      audio = createAudioEffects(audioset, ctx, buffers);

      if (el) {
        const { createVisualEffects } = await import(
          "../../../player/VisualEffects"
        );
        visuals = createVisualEffects(audioset);
        visuals.attach(el);
      }

      const ctl = new AudiosetControl(audioset, {
        onControlStateChanged: newState => {
          setState(newState);
        },
        onControlCommand: command => {
          audio?.run(command);
          visuals?.run(command);
        },
      });
      return ctl;
    }
    createControl().then(instance => {
      if (instance) {
        setControl(instance);
        setState(instance.getState());
      }
    });

    return () => {
      cancelled = true;
      visuals?.detach();
      audio?.detach();
    };
  }, [audioset, buffers, el]);

  return { visualsRef, control, state };
}
