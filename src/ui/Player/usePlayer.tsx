import { useEffect, useState } from "react";
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

export function usePlayer(audioset: Audioset) {
  const [control, setControl] = useState<PlayerControl | null>(null);
  const [state, setState] = useState(EmptyControlState);

  useEffect(() => {
    let cancelled = false;
    let sampler: Sampler | undefined;
    const loader = new ResourceLoader(audioset, status => {
      // TODO: set clip enabled
    });

    loader.preload();

    getActiveAudioContext().then(ctx => {
      if (cancelled) {
        return;
      }

      loader.load();
      sampler = createSampler(audioset, ctx, loader);

      const ctl = new AudiosetControl(audioset, {
        onControlStateChanged: newState => {
          setState(newState);
        },
        onControlCommand: command => {
          sampler?.run(command);
        },
      });
      setControl(ctl);
      setState(ctl.getState());
    });
    return () => {
      cancelled = true;
      sampler?.dispose();
    };
  }, [audioset]);

  return { control, state };
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
