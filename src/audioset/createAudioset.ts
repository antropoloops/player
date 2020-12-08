import debug from "debug";
import { Audioset, isAudioset } from "./Audioset";
import { Bundle, isBundle } from "./Bundle";

const log = debug("atpls:audioset");
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function createAudioset(bundle: any): Bundle {
  if (!isBundle(bundle)) {
    log("Invalid format %o", bundle);
    throw Error("Invalida Audioset format");
  }

  if (isAudioset(bundle)) {
    migrateOrDerive(bundle);
  }
  return bundle;
}

function migrateOrDerive(audioset: Audioset) {
  const bpm = audioset.audio.bpm || 120;
  audioset.clips.forEach((clip) => {
    clip.id = "" + clip.id;
    clip.name = clip.name || capitalize(clip.id);
    clip.artist = clip.artist || "";
    clip.place = clip.place || "";
    clip.country = clip.country || "";
    clip.audio.volume = clip.audio.volume || 0.7;
    clip.audio.durationSeconds = (60 * clip.audio.beats) / bpm;
  });
}
