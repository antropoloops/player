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

const { Group, Project, Media, Selection, Track, Metadata, RemixMetadata, StoredFile, ClipMetadata, AudioRegion, ImageCrop, TrackMetadata } = initSchema(schema);

export {
  Group,
  Project,
  Media,
  Selection,
  Track,
  ProjectType,
  ProjetAccess,
  MediaType,
  ImageUnits,
  Metadata,
  RemixMetadata,
  StoredFile,
  ClipMetadata,
  AudioRegion,
  ImageCrop,
  TrackMetadata
};