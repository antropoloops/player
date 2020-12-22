import { Track, Clip } from "../../models";

export function getTrackSamples(track: Track, selections: Clip[]) {
  return selections.filter((s) => s.trackID === track.id);
}
