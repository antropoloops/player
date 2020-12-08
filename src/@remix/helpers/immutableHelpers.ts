import immer from "immer";
import { enablePatches } from "immer";
import { WritableDraft } from "immer/dist/internal";
import { v4 as uuid } from "uuid";
import {
  Audioset,
  Clip,
  createEmptyClip,
  createEmptyTrack,
  Track,
} from "../../audioset";
import { randomColor } from "./colorHelpers";

// https://immerjs.github.io/immer/docs/patches
enablePatches();

export function mutateAudioset(
  audioset: Audioset,
  mutate: (clip: WritableDraft<Audioset>) => void
) {
  return immer(audioset, mutate, (patches, inverse) => {
    // https://techinscribed.com/implementing-undo-redo-functionality-in-redux-using-immer/
  });
}

export function mutateClip(
  audioset: Audioset,
  clipId: string,
  mutate: (clip: WritableDraft<Clip>) => void
) {
  return mutateAudioset(audioset, (audioset) => {
    const index = audioset.clips.findIndex((c) => c.id === clipId);
    if (index !== -1) {
      mutate(audioset.clips[index]);
    }
  });
}

export function mutateTrack(
  audioset: Audioset,
  clipId: string,
  mutate: (clip: WritableDraft<Track>) => void
) {
  return mutateAudioset(audioset, (audioset) => {
    const index = audioset.tracks.findIndex((t) => t.id === clipId);
    if (index !== -1) {
      mutate(audioset.tracks[index]);
    }
  });
}

export function addNewTrack(audioset: Audioset) {
  return mutateAudioset(audioset, (audioset) => {
    const position = audioset.tracks.length;
    const track = createEmptyTrack({
      id: uuid(),
      name: `Pista ${position + 1}`,
      position,
      color: randomColor("400"),
    });
    audioset.tracks.push(track);
  });
}

export function addNewClip(audioset: Audioset, trackId: string) {
  return mutateAudioset(audioset, (audioset) => {
    const track = audioset.tracks.find((track) => track.id === trackId);

    if (track) {
      const clip = createEmptyClip({
        id: uuid(),
        name: "Clip sin nombre",
        trackId: track.id,
        color: track.color,
      });
      audioset.clips.push(clip);
      track.clipIds.push(clip.id);
    }
  });
}
