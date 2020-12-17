import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export enum ImageUnits {
  PX = "px",
  PERCENT = "percent",
}

export enum ArchiveAccess {
  PRIVATE = "private",
  PUBLIC = "public",
}

export declare class StoredImage {
  readonly key: string;
  readonly type: string;
  readonly role?: string;
  readonly name?: string;
  readonly thumbnail?: string;
  readonly size?: number;
  readonly width?: number;
  readonly height?: number;
  constructor(init: ModelInit<StoredImage>);
}

export declare class ImageCrop {
  readonly aspect?: number;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly unit?: ImageUnits | keyof typeof ImageUnits;
  constructor(init: ModelInit<ImageCrop>);
}

export declare class StoredAudio {
  readonly key: string;
  readonly type: string;
  readonly name?: string;
  readonly thumbnail?: string;
  readonly size?: number;
  readonly duration?: number;
  constructor(init: ModelInit<StoredAudio>);
}

export declare class RecordingMeta {
  readonly title?: string;
  readonly description?: string;
  constructor(init: ModelInit<RecordingMeta>);
}

export declare class SampleRegion {
  readonly offset: number;
  readonly duration: number;
  constructor(init: ModelInit<SampleRegion>);
}

export declare class RemixMetadata {
  readonly title?: string;
  readonly description?: string;
  readonly authors?: string;
  readonly bmp?: number;
  constructor(init: ModelInit<RemixMetadata>);
}

export declare class TrackMetadata {
  readonly name?: string;
  readonly color?: string;
  readonly position?: number;
  readonly volume?: number;
  constructor(init: ModelInit<TrackMetadata>);
}

export declare class ClipMetadata {
  readonly sampleID: string;
  constructor(init: ModelInit<ClipMetadata>);
}

export declare class Group {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly image?: StoredImage[];
  constructor(init: ModelInit<Group>);
  static copyOf(
    source: Group,
    mutator: (draft: MutableModel<Group>) => MutableModel<Group> | void
  ): Group;
}

export declare class Archive {
  readonly id: string;
  readonly groupID: string;
  readonly name: string;
  readonly access: ArchiveAccess | keyof typeof ArchiveAccess;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly group?: Group;
  readonly recordings?: (Recording | null)[];
  constructor(init: ModelInit<Archive>);
  static copyOf(
    source: Archive,
    mutator: (draft: MutableModel<Archive>) => MutableModel<Archive> | void
  ): Archive;
}

export declare class Recording {
  readonly id: string;
  readonly groupID: string;
  readonly meta: RecordingMeta;
  readonly audio?: StoredAudio;
  readonly images?: StoredImage[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly archive?: Archive;
  readonly samples?: (Sample | null)[];
  constructor(init: ModelInit<Recording>);
  static copyOf(
    source: Recording,
    mutator: (draft: MutableModel<Recording>) => MutableModel<Recording> | void
  ): Recording;
}

export declare class Sample {
  readonly id: string;
  readonly groupID: string;
  readonly region: SampleRegion;
  readonly audio?: StoredAudio;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly recording?: Recording;
  readonly remix?: Remix;
  constructor(init: ModelInit<Sample>);
  static copyOf(
    source: Sample,
    mutator: (draft: MutableModel<Sample>) => MutableModel<Sample> | void
  ): Sample;
}

export declare class Remix {
  readonly id: string;
  readonly groupID: string;
  readonly name?: string;
  readonly meta: RemixMetadata;
  readonly images?: StoredImage[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly tracks?: (Track | null)[];
  readonly samples?: (Sample | null)[];
  constructor(init: ModelInit<Remix>);
  static copyOf(
    source: Remix,
    mutator: (draft: MutableModel<Remix>) => MutableModel<Remix> | void
  ): Remix;
}

export declare class Track {
  readonly id: string;
  readonly groupID: string;
  readonly remixID: string;
  readonly meta: TrackMetadata;
  readonly clips?: ClipMetadata[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Track>);
  static copyOf(
    source: Track,
    mutator: (draft: MutableModel<Track>) => MutableModel<Track> | void
  ): Track;
}
