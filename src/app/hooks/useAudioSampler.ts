import { useEffect, useState, useMemo } from "react";
import { getActiveAudioContext } from "../../lib/active-audio-context";
import {
  IGainNode,
  IAudioContext,
  IAudioBufferSourceNode,
} from "standardized-audio-context";
import { decodeAudioBuffer } from "../../player/Loader/decodeAudioBuffer";
import { Audioset } from "../../audioset";

export function useAudioContext() {
  const [context, setContext] = useState<IAudioContext | undefined>();

  useEffect(() => {
    getActiveAudioContext().then(setContext);
  }, []);
  return context;
}

export type AudioTrack = {
  input: IGainNode<IAudioContext>;
};

type SampleUrl = {
  mp3: string;
  ogg?: string;
  wav?: string;
};

export type AudioSample = {
  isPlaying: () => boolean;
  start: (time: number) => void;
  stop: (time: number) => void;
};

export type AudioSampler = {
  tracks: Record<string, AudioTrack>;
  clips: Record<string, AudioSample>;
};

const NoSampler: AudioSampler = Object.freeze({
  tracks: {},
  clips: {},
});

export function useAudioSampler(audioset: Audioset): AudioSampler {
  const ctx = useAudioContext();
  const [responses, setResponses] = useState<Response[]>([]);
  const [buffers, setBuffers] = useState<AudioBuffer[]>([]);

  // load all audio
  useEffect(() => {
    Promise.all(
      audioset.clips
        .map((clip) => clip.resources.audio.mp3)
        .map((url) => fetch(url))
    ).then(setResponses);
  }, [audioset]);

  // decode all audio
  useEffect(() => {
    if (ctx) {
      Promise.all(
        responses.map((response) => decodeAudioBuffer(response, ctx))
      ).then(setBuffers);
    }
  }, [responses, ctx]);

  const sampler = useMemo(() => {
    if (!ctx || !buffers.length) return NoSampler;
    return createAudioSampler(ctx, audioset, buffers);
  }, [audioset, ctx, buffers]);

  return sampler;
}

function createAudioSampler(
  ctx: IAudioContext,
  audioset: Audioset,
  buffers: AudioBuffer[]
): AudioSampler {
  const tracks = audioset.tracks.reduce((tracks, track) => {
    tracks[track.id] = createAudioTrack(ctx);
    return tracks;
  }, {} as Record<string, AudioTrack>);

  const clips = audioset.clips.reduce((clips, clip, i) => {
    clips[clip.id] = createAudioSample(ctx, buffers[i], tracks[clip.trackId]);
    return clips;
  }, {} as Record<string, AudioSample>);

  return { tracks, clips };
}

function createAudioSample(
  ctx: IAudioContext,
  buffer: AudioBuffer,
  track: AudioTrack
): AudioSample {
  let source: IAudioBufferSourceNode<IAudioContext> | undefined;

  const start = (time: number) => {
    if (!source) {
      source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(track.input);
      source.loop = true;
      source.start(time);
    }
  };

  const stop = (time: number) => {
    if (source) {
      source.stop(time);
      source = undefined;
    }
  };

  const isPlaying = () => !!source;

  return { start, stop, isPlaying };
}

function createAudioTrack(ctx: IAudioContext): AudioTrack {
  const gain = ctx.createGain();
  gain.connect(ctx.destination);
  const track = { input: gain };
  return track;
}
