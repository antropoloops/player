// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const ImageUnits = {
  PX: "px",
  PERCENT: "percent",
};

const ArchiveAccess = {
  PRIVATE: "private",
  PUBLIC: "public",
};

const {
  Group,
  Archive,
  Recording,
  Sample,
  Remix,
  Track,
  StoredImage,
  ImageCrop,
  StoredAudio,
  RecordingMeta,
  SampleRegion,
  RemixMetadata,
  TrackMetadata,
  ClipMetadata,
} = initSchema(schema);

export {
  Group,
  Archive,
  Recording,
  Sample,
  Remix,
  Track,
  ImageUnits,
  ArchiveAccess,
  StoredImage,
  ImageCrop,
  StoredAudio,
  RecordingMeta,
  SampleRegion,
  RemixMetadata,
  TrackMetadata,
  ClipMetadata,
};
