import { Clip } from "./Clip";
import { Track } from "./Track";

/**
 * An unsepecified audioset type
 */
export interface AudiosetBundle {
  format: "atpls-audioset";
  type: "audioset" | "project";
  meta: AudiosetMetadata;
}

export function isAudiosetBundle(data: any): data is AudiosetBundle {
  return typeof data === "object" && data.format === "atpls-audioset";
}

export interface Audioset extends AudiosetBundle {
  type: "audioset";
  id: string;
  tracks: Track[];
  clips: Clip[];
  visuals: AudiosetVisuals;
  index: AudiosetIndexes;
}

export function isAudiosetPack(audioset: AudiosetBundle): audioset is Audioset {
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
 * The aaudioset metadata extended to include the audioset id and publish path
 * It's used in audioset project to list audiosets
 */
export type AudiosetReference = AudiosetMetadata & {
  id: string;
  publish_path: string;
};

/**
 * An AudiosetProject is a group of audiosets
 */
export interface AudiosetProject extends AudiosetBundle {
  type: "project";
  audiosets: AudiosetReference[];
}
export interface AudiosetIndexes {
  clipById: Record<string, Clip>;
  trackById: Record<string, Track>;
  clipIdsOfTrack: Record<string, string[]>;
  trackIdOfClip: Record<string, string>;
}

export type AudiosetVisuals = MapVisuals | PanelVisuals;

export interface MapVisuals {
  mode: "map";
  geomap: {
    url: string;
    scaleFactor: number;
    center: {
      x: number;
      y: number;
    };
  };
}

export interface PanelVisuals {
  mode: "panel";
  image: {
    url: string;
    size: {
      width: number;
      height: number;
    };
  };
}
