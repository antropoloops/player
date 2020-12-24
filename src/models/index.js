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

const { Group, Project, Media, Track, Clip, Metadata, RemixMetadata, StoredFile, TrackMetadata, AudioRegion, ImageCrop, ClipMetadata, MediaResource, EditedAudio, EditedImage, EditableAudio, EditableImage } = initSchema(schema);

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
  StoredFile,
  TrackMetadata,
  AudioRegion,
  ImageCrop,
  ClipMetadata,
  MediaResource,
  EditedAudio,
  EditedImage,
  EditableAudio,
  EditableImage
};