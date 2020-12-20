import { Track, Selection } from "../../models";

export function getTrackSamples(track: Track, selections: Selection[]) {
  return selections.filter((s) => s.trackID === track.id);
}
