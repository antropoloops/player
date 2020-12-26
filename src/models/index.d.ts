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

export enum MediaType {
  RECORDING = "recording",
  IMAGE = "image",
}

export enum ImageUnits {
  PX = "px",
  PERCENT = "percent",
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

export declare class EditableImage {
  readonly original: MediaResource;
  readonly current: EditedImage;
  constructor(init: ModelInit<EditableImage>);
}

export declare class MediaResource {
  readonly mediaID?: string;
  readonly file?: StoredFile;
  constructor(init: ModelInit<MediaResource>);
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

export declare class EditedImage {
  readonly crop?: ImageCrop;
  readonly file?: StoredFile;
  constructor(init: ModelInit<EditedImage>);
}

export declare class ImageCrop {
  readonly aspect?: number;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  constructor(init: ModelInit<ImageCrop>);
}

export declare class TrackMetadata {
  readonly name?: string;
  readonly color?: string;
  readonly position?: number;
  readonly volume?: number;
  constructor(init: ModelInit<TrackMetadata>);
}

export declare class AudioRegion {
  readonly offset: number;
  readonly duration: number;
  constructor(init: ModelInit<AudioRegion>);
}

export declare class ClipMetadata {
  readonly name: string;
  readonly keyboardKey?: string;
  constructor(init: ModelInit<ClipMetadata>);
}

export declare class EditedAudio {
  readonly region?: AudioRegion;
  readonly file?: StoredFile;
  constructor(init: ModelInit<EditedAudio>);
}

export declare class EditableAudio {
  readonly original: MediaResource;
  readonly current: EditedAudio;
  constructor(init: ModelInit<EditableAudio>);
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
  readonly type: ProjectType | keyof typeof ProjectType;
  readonly access: ProjetAccess | keyof typeof ProjetAccess;
  readonly meta: Metadata;
  readonly remix: RemixMetadata;
  readonly image?: EditableImage;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Project>);
  static copyOf(
    source: Project,
    mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void
  ): Project;
}

export declare class Media {
  readonly id: string;
  readonly groupID: string;
  readonly projectID: string;
  readonly type: MediaType | keyof typeof MediaType;
  readonly meta: Metadata;
  readonly file: StoredFile;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Media>);
  static copyOf(
    source: Media,
    mutator: (draft: MutableModel<Media>) => MutableModel<Media> | void
  ): Media;
}

export declare class Track {
  readonly id: string;
  readonly groupID: string;
  readonly projectID: string;
  readonly meta: TrackMetadata;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Track>);
  static copyOf(
    source: Track,
    mutator: (draft: MutableModel<Track>) => MutableModel<Track> | void
  ): Track;
}

export declare class Clip {
  readonly id: string;
  readonly groupID: string;
  readonly projectID: string;
  readonly trackID: string;
  readonly meta: ClipMetadata;
  readonly audio?: EditableAudio;
  readonly image?: EditableImage;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Clip>);
  static copyOf(
    source: Clip,
    mutator: (draft: MutableModel<Clip>) => MutableModel<Clip> | void
  ): Clip;
}
