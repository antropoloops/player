import { Audioset } from "../audioset";

type ClipPlayEffect = {
  type: "clip:play";
  time: number;
  clipId: string;
  play: boolean;
};
type TrackPlayEffect = {
  type: "track:play";
  time: number;
  trackId: string;
  play: boolean;
};
export type Effect = ClipPlayEffect | TrackPlayEffect;

export type ClipStatus4 = {
  playing: boolean;
  time: number;
  dirty?: boolean;
};
export type TrackStatus4 = {
  playing: boolean;
  time: number;
  dirty?: boolean;
};

export type Status4 = {
  clips: Record<string, ClipStatus4>;
  tracks: Record<string, TrackStatus4>;
};

export type Command = (audioset: Audioset, status: Status4) => Effect[];

export function startClipPoly(clipId: string, time: number): Command {
  return (audioset, status) => {
    const { trackId } = audioset.index.clipById[clipId];
    const { clipIds } = audioset.index.trackById[trackId];

    const actions: Effect[] = [];

    // start clip if stopped
    if (!status.clips[clipId].playing) {
      actions.push({ type: "clip:play", time, clipId, play: true });
    }
    // start track if stopped
    if (!status.tracks[trackId].playing) {
      actions.push({ type: "track:play", time, trackId, play: true });
    }
    // stop other clips in same track
    for (const id of clipIds) {
      if (status.clips[id].playing && id !== clipId) {
        actions.push({ type: "clip:play", time, clipId: id, play: false });
      }
    }

    return actions;
  };
}

export function startClipMono(clipId: string, time: number): Command {
  return (audioset, status) => {
    const { trackId } = audioset.index.clipById[clipId];

    const actions: Effect[] = [];

    // start clip if stopped
    if (!status.clips[clipId].playing) {
      actions.push({ type: "clip:play", time, clipId, play: true });
    }
    // start track if stopped
    if (!status.tracks[trackId].playing) {
      actions.push({ type: "track:play", time, trackId, play: true });
    }
    // stop all other clips
    for (const [id, clipStatus4] of Object.entries(status.clips)) {
      if (clipStatus4.playing && id !== clipId) {
        actions.push({ type: "clip:play", time, clipId: id, play: false });
      }
    }
    // stop all other tracks
    for (const [id, trackStatus4] of Object.entries(status.tracks)) {
      if (trackStatus4.playing && id !== trackId) {
        actions.push({ type: "track:play", time, trackId: id, play: false });
      }
    }

    return actions;
  };
}

export function stopClip(clipId: string, time: number): Command {
  return (audioset, status) => {
    const { trackId } = audioset.index.clipById[clipId];

    const actions: Effect[] = [];
    // stop clip if playing
    if (status.clips[clipId].playing) {
      actions.push({ type: "clip:play", time, clipId, play: false });
    }
    // stop track if playing
    if (status.tracks[trackId].playing) {
      actions.push({ type: "track:play", time, trackId, play: false });
    }
    return actions;
  };
}

export function stopTrack(trackId: string, time: number): Command {
  return (audioset, status) => {
    const actions: Effect[] = [];
    const { clipIds } = audioset.index.trackById[trackId];

    // stop track if playing
    if (status.tracks[trackId].playing) {
      actions.push({ type: "track:play", time, trackId, play: false });
    }
    // stop clips in track
    for (const id of clipIds) {
      if (status.clips[id].playing) {
        actions.push({ type: "clip:play", time, clipId: id, play: false });
      }
    }

    return actions;
  };
}

export function stopAll(time: number): Command {
  return (audioset, status) => {
    const actions: Effect[] = [];
    // stop all other clips
    for (const [clipId, clipStatus4] of Object.entries(status.clips)) {
      if (clipStatus4.playing) {
        actions.push({ type: "clip:play", time, clipId, play: false });
      }
    }
    // stop all other tracks
    for (const [trackId, trackStatus4] of Object.entries(status.tracks)) {
      if (trackStatus4.playing) {
        actions.push({ type: "track:play", time, trackId, play: false });
      }
    }
    return actions;
  };
}
