import { Bundle, BundleMetadata } from "./Bundle";

/**
 * An Project is a group of audiosets
 */
export interface Project extends Bundle {
  type: "project";
  audiosets: AudiosetReference[];
}

export interface AudiosetReference extends BundleMetadata {
  id: string;
  publish_path: string;
}
