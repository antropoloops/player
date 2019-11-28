import { Bundle, BundleMetadata } from "./Bundle";

/**
 * An AudiosetProject is a group of audiosets
 */
export interface AudiosetProject extends Bundle {
  type: "project";
  audiosets: AudiosetReference[];
}

export interface AudiosetReference extends BundleMetadata {
  id: string;
  publish_path: string;
}
