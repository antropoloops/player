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
  index: AudiosetIndexes;
}

export function isAudioset(audioset: Bundle): audioset is Audioset {
  return audioset.type === "audioset";
}
export function isProject(audioset: Bundle): audioset is Project {
  return audioset.type === "project";
}

export interface AudiosetIndexes {
  clipById: Record<string, Clip>;
  trackById: Record<string, Track>;
  clipIdsOfTrack: Record<string, string[]>;
  trackIdOfClip: Record<string, string>;
}
