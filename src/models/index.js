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

const { Group, Project, Media, Track, Clip, Metadata, Display, EditableImage, MediaResource, StoredFile, EditedImage, ImageCrop, RemixMetadata, TrackMetadata, AudioRegion, ClipMetadata, EditedAudio, EditableAudio } = initSchema(schema);

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
  Display,
  EditableImage,
  MediaResource,
  StoredFile,
  EditedImage,
  ImageCrop,
  RemixMetadata,
  TrackMetadata,
  AudioRegion,
  ClipMetadata,
  EditedAudio,
  EditableAudio
};