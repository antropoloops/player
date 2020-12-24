// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ProjectType = {
  "ARCHIVE": "archive",
  "REMIX": "remix"
};

const ProjetAccess = {
  "GROUP": "group"
};

const MediaType = {
  "RECORDING": "recording",
  "IMAGE": "image"
};

const ImageUnits = {
  "PX": "px",
  "PERCENT": "percent"
};

const { Group, Project, Media, Track, Clip, Metadata, RemixMetadata, EditedImage, ImageCrop, StoredFile, TrackMetadata, AudioRegion, ClipMetadata, MediaResource, EditedAudio, EditableAudio, EditableImage } = initSchema(schema);

export {
  Group,
  Project,
  Media,
  Track,
  Clip,
  ProjectType,
  ProjetAccess,
  MediaType,
  ImageUnits,
  Metadata,
  RemixMetadata,
  EditedImage,
  ImageCrop,
  StoredFile,
  TrackMetadata,
  AudioRegion,
  ClipMetadata,
  MediaResource,
  EditedAudio,
  EditableAudio,
  EditableImage
};