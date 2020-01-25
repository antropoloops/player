import { useCallback, useEffect, useState } from "react";
import { IAudioContext } from "standardized-audio-context";
import { Audioset } from "../../audioset";
import {
  AudioContextEngine,
  getActiveAudioContext,
  SampleBuffers,
  Sampler,
} from "../../player/Audio";
import {
  AudiosetControl,
  EmptyControlState,
  PlayerControl,
} from "../../player/Control";
import { Effects } from "../../player/Control/Effects";

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
    let sampler: Sampler | undefined;
    let visuals: Effects | undefined;

    async function createControl() {
      const ctx = await getActiveAudioContext();

      if (cancelled) {
        return;
      }

      sampler = createSampler(audioset, ctx, buffers);

      if (el) {
        const { createVisualEffects } = await import(
          "../../player/VisualEffects"
        );
        visuals = createVisualEffects(audioset);
        visuals.attach(el);
      }

      const ctl = new AudiosetControl(audioset, {
        onControlStateChanged: newState => {
          setState(newState);
        },
        onControlCommand: command => {
          sampler?.run(command);
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
      sampler?.dispose();
    };
  }, [audioset, buffers, el]);

  return { visualsRef, control, state };
}

function createSampler(
  audioset: Audioset,
  ctx: IAudioContext,
  buffers: SampleBuffers,
): Sampler {
  const audio = new AudioContextEngine(ctx);
  const sampler = new Sampler(audioset, buffers, audio);
  return sampler;
}
