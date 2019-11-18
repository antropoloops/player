import debug from "debug";
import {
  Audioset,
  AudiosetData,
  AudiosetIndexes,
  isAudiosetData,
  isAudiosetPack,
} from "./Audioset";

const log = debug("atpls:audioset");
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function createAudioset(data: any): AudiosetData {
  if (!isAudiosetData(data)) {
    log("Invalid format %o", data);
    throw Error("Invalida Audioset format");
  }
  if (isAudiosetPack(data)) {
    migrateOrDerive(data);
    createIndices(data);
  }
  return data;
}

function migrateOrDerive(audioset: Audioset) {
  const bpm = audioset.meta.bpm || 120;
  audioset.clips.forEach(clip => {
    clip.name = clip.name || capitalize(clip.id);
    clip.artist = clip.artist || "";
    clip.place = clip.place || "";
    clip.country = clip.country || "";
    clip.audio.volume = clip.audio.volume || 0.7;
    clip.audio.durationSeconds = (60 * clip.audio.beats) / bpm;
  });
}

function createIndices(audioset: Audioset) {
  const index: AudiosetIndexes = {
    clipById: {},
    trackById: {},
    clipIdsOfTrack: {},
    trackIdOfClip: {},
  };
  audioset.clips.forEach(clip => {
    index.clipById[clip.id] = clip;
    index.trackIdOfClip[clip.id] = clip.trackId;
  });
  audioset.tracks.forEach(track => {
    index.trackById[track.id] = track;
    index.clipIdsOfTrack[track.id] = track.clipIds;
  });
  audioset.index = index;
}