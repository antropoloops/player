/**
 * An unsepecified audioset type
 */
export interface Bundle {
  type: "audioset" | "project";
  meta: BundleMetadata;
}

export interface BundleMetadata {
  title: string;
  description: string;
  path: string;
  parent_path: string;
  logo_url: string;
  readme: string;
}

export function isBundle(data: any): data is Bundle {
  return typeof data === "object" && data.format === "atpls-audioset";
}
