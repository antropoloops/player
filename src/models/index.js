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

const ImageUnits = {
  "PX": "px",
  "PERCENT": "percent"
};

const MediaType = {
  "RECORDING": "recording",
  "IMAGE": "image"
};

const { Group, Project, Media, Sample, Track, Metadata, RemixMetadata, StoredFile, AudioRegion, ImageCrop, TrackMetadata, ClipMetadata } = initSchema(schema);

export {
  Group,
  Project,
  Media,
  Sample,
  Track,
  ProjectType,
  ProjetAccess,
  ImageUnits,
  MediaType,
  Metadata,
  RemixMetadata,
  StoredFile,
  AudioRegion,
  ImageCrop,
  TrackMetadata,
  ClipMetadata
};