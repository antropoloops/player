import { Audioset, AudiosetProject } from "./Audioset";
/**
 * An unsepecified audioset type
 */
export type AudiosetBundle = AudiosetProject | Audioset;

export function isAudiosetBundle(data: any): data is AudiosetBundle {
  return typeof data === "object" && data.format === "atpls-audioset";
}
