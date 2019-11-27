import { AudiosetBundle } from "./AudiosetBundle";
import { AudiosetVisuals } from "./AudiosetVisuals";
import { Clip } from "./Clip";
import { Track } from "./Track";

export interface Audioset {
  type: "audioset";
  meta: AudiosetMetadata;
  id: string;
  tracks: Track[];
  clips: Clip[];
  visuals: AudiosetVisuals;
  index: AudiosetIndexes;
}

export function isAudioset(audioset: AudiosetBundle): audioset is Audioset {
  return audioset.type === "audioset";
}

export interface AudiosetMetadata {
  title: string;
  description: string;
  path: string;
  parent_path: string;
  logo_url: string;
  readme: string;
  // FIXME: move to Audio section
  bpm?: number;
}
/**
 * The audioset metadata extended to include the audioset id and publish path
 * It's used in audioset project to list audiosets
 */
export interface AudiosetReference extends AudiosetMetadata {
  id: string;
  publish_path: string;
}

/**
 * An AudiosetProject is a group of audiosets
 */
export interface AudiosetProject {
  type: "project";
  meta: AudiosetMetadata;
  audiosets: AudiosetReference[];
}

export interface AudiosetIndexes {
  clipById: Record<string, Clip>;
  trackById: Record<string, Track>;
  clipIdsOfTrack: Record<string, string[]>;
  trackIdOfClip: Record<string, string>;
}
