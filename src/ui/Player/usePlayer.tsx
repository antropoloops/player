import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [clipsReady, setClipsReady] = useState(false);
  const loader = useMemo<ResourceLoader>(
    () =>
      new ResourceLoader(audioset, status => {
        if (status.stage === "ready") {
          setClipsReady(true);
        }
      }),
    [audioset],
  );
  // Make visuals render after reference is set: https://dev.to/thekashey/the-same-useref-but-it-will-callback-8bo
  const [el, setReference] = useState<HTMLDivElement | null>(null);
  const visualsRef = useCallback((newRef: HTMLDivElement) => {
    setReference(newRef);
  }, []);

  const [isStarted, setStarted] = useState<boolean>(false);
  const [control, setControl] = useState<PlayerControl | null>(null);
  const [state, setState] = useState(EmptyControlState);

  useEffect(() => {
    let cancelled = false;
    let sampler: Sampler | undefined;
    let visuals: VC | undefined;

    async function createPlayer() {
      if (!el) {
        // FIXME: if no visuals div, nothing works
        // this is to prevent create a player without visuals
        // maybe we want to configure visuals or not
        return;
      }

      const { VisualControl } = await import("../../visuals/index");
      const ctx = await getActiveAudioContext();

      if (cancelled) {
        return;
      }

      loader.load(ctx);
      sampler = createSampler(audioset, ctx, loader);

      visuals = new VisualControl(audioset, el);

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
  }, [audioset, loader, el]);

  return { visualsRef, control, state, isStarted, setStarted, clipsReady };
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
