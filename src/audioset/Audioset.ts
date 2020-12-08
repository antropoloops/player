import { AudioMetadata } from "./AudioMetadata";
import { Bundle } from "./Bundle";
import { Clip } from "./Clip";
import { Track } from "./Track";
import { VisualsMetadata } from "./VisualsMetadata";
import { Project } from "./Project";

export interface Audioset extends Bundle {
  id: string;
  tracks: Track[];
  clips: Clip[];
  audio: AudioMetadata;
  visuals: VisualsMetadata;
}

export function isAudioset(audioset: Bundle): audioset is Audioset {
  return audioset.type === "audioset";
}
export function isProject(audioset: Bundle): audioset is Project {
  return audioset.type === "project";
}

export function safeFindClipById(audioset: Audioset, clipId: string) {
  return audioset.clips.find((c) => c.id === clipId) as Clip;
}

export function safeFindTrackById(audioset: Audioset, trackId: string) {
  return audioset.tracks.find((t) => t.id === trackId) as Track;
}

export function findClipsOfTrack(audioset: Audioset, track: Track) {
  return track.clipIds.map((clipId) => safeFindClipById(audioset, clipId));
}
