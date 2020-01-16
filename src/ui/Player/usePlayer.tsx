import { useEffect, useRef, useState } from "react";
import { IAudioContext } from "standardized-audio-context";
import { Audioset } from "../../audioset";
import { getActiveAudioContext } from "../../player";
import { AudioContextEngine } from "../../player/AudioContextEngine";
import {
  AudiosetControl,
  EmptyControlState,
  PlayerControl,
} from "../../player/Control";
import { ResourceLoader } from "../../player/ResourceLoader";
import { Sampler } from "../../player/Sampler";
import { VisualControl as VC } from "../../visuals";

export function usePlayer(audioset: Audioset) {
  const visualsRef = useRef<HTMLDivElement>(null);
  const [control, setControl] = useState<PlayerControl | null>(null);
  const [state, setState] = useState(EmptyControlState);

  useEffect(() => {
    let cancelled = false;
    let sampler: Sampler | undefined;
    let visuals: VC | undefined;

    async function createPlayer() {
      const loader = new ResourceLoader(audioset, status => {
        // TODO: set clip enabled
      });
      loader.preload();

      const { VisualControl } = await import("../../visuals/index");
      const ctx = await getActiveAudioContext();

      if (cancelled) {
        return;
      }

      loader.load();
      sampler = createSampler(audioset, ctx, loader);

      if (visualsRef.current) {
        visuals = new VisualControl(audioset, visualsRef.current);
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
      setControl(ctl);
      setState(ctl.getState());
    }

    createPlayer();
    return () => {
      cancelled = true;
      visuals?.detach();
      sampler?.dispose();
    };
  }, [audioset]);

  return { visualsRef, control, state };
}

function createSampler(
  audioset: Audioset,
  ctx: IAudioContext,
  buffers: ResourceLoader,
): Sampler {
  const audio = new AudioContextEngine(ctx);
  const sampler = new Sampler(audioset, buffers, audio);
  return sampler;
}
