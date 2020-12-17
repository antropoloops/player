import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export enum ProjectType {
  ARCHIVE = "archive",
  REMIX = "remix",
}

export enum ProjetAccess {
  GROUP = "group",
}

export enum ImageUnits {
  PX = "px",
  PERCENT = "percent",
}

export enum MediaType {
  RECORDING = "recording",
  IMAGE = "image",
}

export declare class Metadata {
  readonly title?: string;
  readonly description?: string;
  readonly authors?: string;
  readonly credits?: string;
  readonly licenses?: string;
  readonly readme?: string;
  constructor(init: ModelInit<Metadata>);
}

export declare class RemixMetadata {
  readonly bmp?: number;
  constructor(init: ModelInit<RemixMetadata>);
}

export declare class StoredFile {
  readonly key: string;
  readonly mimeType: string;
  readonly fileName?: string;
  readonly fileSize?: number;
  readonly thumbnail?: string;
  readonly duration?: number;
  readonly width?: number;
  readonly height?: number;
  constructor(init: ModelInit<StoredFile>);
}

export declare class AudioRegion {
  readonly offset: number;
  readonly duration: number;
  constructor(init: ModelInit<AudioRegion>);
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
  readonly meta: Metadata;
  constructor(init: ModelInit<Group>);
  static copyOf(
    source: Group,
    mutator: (draft: MutableModel<Group>) => MutableModel<Group> | void
  ): Group;
}

export declare class Project {
  readonly id: string;
  readonly groupID: string;
  readonly name: string;
  readonly type: ProjectType | keyof typeof ProjectType;
  readonly access: ProjetAccess | keyof typeof ProjetAccess;
  readonly meta: Metadata;
  readonly remix: RemixMetadata;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly group?: Group;
  readonly recordings?: (Media | null)[];
  readonly tracks?: (Track | null)[];
  readonly samples?: (Sample | null)[];
  constructor(init: ModelInit<Project>);
  static copyOf(
    source: Project,
    mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void
  ): Project;
}

export declare class Media {
  readonly id: string;
  readonly groupID: string;
  readonly meta: Metadata;
  readonly file?: StoredFile;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly project?: Project;
  readonly samples?: (Sample | null)[];
  constructor(init: ModelInit<Media>);
  static copyOf(
    source: Media,
    mutator: (draft: MutableModel<Media>) => MutableModel<Media> | void
  ): Media;
}

export declare class Sample {
  readonly id: string;
  readonly groupID: string;
  readonly audio: AudioRegion;
  readonly image: ImageCrop;
  readonly file?: StoredFile;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly media?: Media;
  readonly project?: Project;
  constructor(init: ModelInit<Sample>);
  static copyOf(
    source: Sample,
    mutator: (draft: MutableModel<Sample>) => MutableModel<Sample> | void
  ): Sample;
}

export declare class Track {
  readonly id: string;
  readonly groupID: string;
  readonly projectID: string;
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
