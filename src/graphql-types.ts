/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGroupInput = {
  id?: string | null;
  name: string;
  meta: MetadataInput;
  _version?: number | null;
};

export type MetadataInput = {
  title?: string | null;
  description?: string | null;
  authors?: string | null;
  credits?: string | null;
  licenses?: string | null;
  readme?: string | null;
};

export type ModelGroupConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelGroupConditionInput | null> | null;
  or?: Array<ModelGroupConditionInput | null> | null;
  not?: ModelGroupConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateGroupInput = {
  id: string;
  name?: string | null;
  meta?: MetadataInput | null;
  _version?: number | null;
};

export type DeleteGroupInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateProjectInput = {
  id?: string | null;
  groupID: string;
  name: string;
  type: ProjectType;
  access: ProjetAccess;
  meta: MetadataInput;
  remix: RemixMetadataInput;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export enum ProjectType {
  archive = "archive",
  remix = "remix",
}

export enum ProjetAccess {
  group = "group",
}

export type RemixMetadataInput = {
  bmp?: number | null;
};

export type ModelProjectConditionInput = {
  groupID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  type?: ModelProjectTypeInput | null;
  access?: ModelProjetAccessInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelProjectConditionInput | null> | null;
  or?: Array<ModelProjectConditionInput | null> | null;
  not?: ModelProjectConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelProjectTypeInput = {
  eq?: ProjectType | null;
  ne?: ProjectType | null;
};

export type ModelProjetAccessInput = {
  eq?: ProjetAccess | null;
  ne?: ProjetAccess | null;
};

export type UpdateProjectInput = {
  id: string;
  groupID?: string | null;
  name?: string | null;
  type?: ProjectType | null;
  access?: ProjetAccess | null;
  meta?: MetadataInput | null;
  remix?: RemixMetadataInput | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteProjectInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateMediaInput = {
  id?: string | null;
  projectID: string;
  groupID: string;
  type: MediaType;
  meta: MetadataInput;
  file: StoredFileInput;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export enum MediaType {
  recording = "recording",
  image = "image",
}

export type StoredFileInput = {
  key: string;
  mimeType: string;
  fileName?: string | null;
  fileSize?: number | null;
  thumbnail?: string | null;
  duration?: number | null;
  width?: number | null;
  height?: number | null;
};

export type ModelMediaConditionInput = {
  projectID?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  type?: ModelMediaTypeInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelMediaConditionInput | null> | null;
  or?: Array<ModelMediaConditionInput | null> | null;
  not?: ModelMediaConditionInput | null;
};

export type ModelMediaTypeInput = {
  eq?: MediaType | null;
  ne?: MediaType | null;
};

export type UpdateMediaInput = {
  id: string;
  projectID?: string | null;
  groupID?: string | null;
  type?: MediaType | null;
  meta?: MetadataInput | null;
  file?: StoredFileInput | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteMediaInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateTrackInput = {
  id?: string | null;
  groupID: string;
  projectID: string;
  meta: TrackMetadataInput;
  clips: Array<ClipMetadataInput>;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type TrackMetadataInput = {
  name?: string | null;
  color?: string | null;
  position?: number | null;
  volume?: number | null;
};

export type ClipMetadataInput = {
  selectionID: string;
};

export type ModelTrackConditionInput = {
  groupID?: ModelIDInput | null;
  projectID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelTrackConditionInput | null> | null;
  or?: Array<ModelTrackConditionInput | null> | null;
  not?: ModelTrackConditionInput | null;
};

export type UpdateTrackInput = {
  id: string;
  groupID?: string | null;
  projectID?: string | null;
  meta?: TrackMetadataInput | null;
  clips?: Array<ClipMetadataInput> | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteTrackInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateSelectionInput = {
  id?: string | null;
  groupID: string;
  projectID: string;
  mediaID: string;
  trackID?: string | null;
  role?: string | null;
  type?: MediaType | null;
  audio?: AudioRegionInput | null;
  image?: ImageCropInput | null;
  file?: StoredFileInput | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type AudioRegionInput = {
  offset: number;
  duration: number;
};

export type ImageCropInput = {
  aspect?: number | null;
  x?: number | null;
  y?: number | null;
  width?: number | null;
  height?: number | null;
  unit?: ImageUnits | null;
};

export enum ImageUnits {
  px = "px",
  percent = "percent",
}

export type ModelSelectionConditionInput = {
  groupID?: ModelIDInput | null;
  projectID?: ModelIDInput | null;
  mediaID?: ModelIDInput | null;
  trackID?: ModelIDInput | null;
  role?: ModelStringInput | null;
  type?: ModelMediaTypeInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelSelectionConditionInput | null> | null;
  or?: Array<ModelSelectionConditionInput | null> | null;
  not?: ModelSelectionConditionInput | null;
};

export type UpdateSelectionInput = {
  id: string;
  groupID?: string | null;
  projectID?: string | null;
  mediaID?: string | null;
  trackID?: string | null;
  role?: string | null;
  type?: MediaType | null;
  audio?: AudioRegionInput | null;
  image?: ImageCropInput | null;
  file?: StoredFileInput | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteSelectionInput = {
  id?: string | null;
  _version?: number | null;
};

export type ModelGroupFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelGroupFilterInput | null> | null;
  or?: Array<ModelGroupFilterInput | null> | null;
  not?: ModelGroupFilterInput | null;
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  type?: ModelProjectTypeInput | null;
  access?: ModelProjetAccessInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelProjectFilterInput | null> | null;
  or?: Array<ModelProjectFilterInput | null> | null;
  not?: ModelProjectFilterInput | null;
};

export type ModelMediaFilterInput = {
  id?: ModelIDInput | null;
  projectID?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  type?: ModelMediaTypeInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelMediaFilterInput | null> | null;
  or?: Array<ModelMediaFilterInput | null> | null;
  not?: ModelMediaFilterInput | null;
};

export type ModelTrackFilterInput = {
  id?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  projectID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelTrackFilterInput | null> | null;
  or?: Array<ModelTrackFilterInput | null> | null;
  not?: ModelTrackFilterInput | null;
};

export type ModelSelectionFilterInput = {
  id?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  projectID?: ModelIDInput | null;
  mediaID?: ModelIDInput | null;
  trackID?: ModelIDInput | null;
  role?: ModelStringInput | null;
  type?: ModelMediaTypeInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelSelectionFilterInput | null> | null;
  or?: Array<ModelSelectionFilterInput | null> | null;
  not?: ModelSelectionFilterInput | null;
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput;
  condition?: ModelGroupConditionInput | null;
};

export type CreateGroupMutation = {
  createGroup: {
    __typename: "Group";
    id: string;
    name: string;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateGroupMutationVariables = {
  input: UpdateGroupInput;
  condition?: ModelGroupConditionInput | null;
};

export type UpdateGroupMutation = {
  updateGroup: {
    __typename: "Group";
    id: string;
    name: string;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteGroupMutationVariables = {
  input: DeleteGroupInput;
  condition?: ModelGroupConditionInput | null;
};

export type DeleteGroupMutation = {
  deleteGroup: {
    __typename: "Group";
    id: string;
    name: string;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput;
  condition?: ModelProjectConditionInput | null;
};

export type CreateProjectMutation = {
  createProject: {
    __typename: "Project";
    id: string;
    groupID: string;
    name: string;
    type: ProjectType;
    access: ProjetAccess;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    remix: {
      __typename: "RemixMetadata";
      bmp: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput;
  condition?: ModelProjectConditionInput | null;
};

export type UpdateProjectMutation = {
  updateProject: {
    __typename: "Project";
    id: string;
    groupID: string;
    name: string;
    type: ProjectType;
    access: ProjetAccess;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    remix: {
      __typename: "RemixMetadata";
      bmp: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput;
  condition?: ModelProjectConditionInput | null;
};

export type DeleteProjectMutation = {
  deleteProject: {
    __typename: "Project";
    id: string;
    groupID: string;
    name: string;
    type: ProjectType;
    access: ProjetAccess;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    remix: {
      __typename: "RemixMetadata";
      bmp: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateMediaMutationVariables = {
  input: CreateMediaInput;
  condition?: ModelMediaConditionInput | null;
};

export type CreateMediaMutation = {
  createMedia: {
    __typename: "Media";
    id: string;
    projectID: string;
    groupID: string;
    type: MediaType;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateMediaMutationVariables = {
  input: UpdateMediaInput;
  condition?: ModelMediaConditionInput | null;
};

export type UpdateMediaMutation = {
  updateMedia: {
    __typename: "Media";
    id: string;
    projectID: string;
    groupID: string;
    type: MediaType;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteMediaMutationVariables = {
  input: DeleteMediaInput;
  condition?: ModelMediaConditionInput | null;
};

export type DeleteMediaMutation = {
  deleteMedia: {
    __typename: "Media";
    id: string;
    projectID: string;
    groupID: string;
    type: MediaType;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateTrackMutationVariables = {
  input: CreateTrackInput;
  condition?: ModelTrackConditionInput | null;
};

export type CreateTrackMutation = {
  createTrack: {
    __typename: "Track";
    id: string;
    groupID: string;
    projectID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      selectionID: string;
    }>;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateTrackMutationVariables = {
  input: UpdateTrackInput;
  condition?: ModelTrackConditionInput | null;
};

export type UpdateTrackMutation = {
  updateTrack: {
    __typename: "Track";
    id: string;
    groupID: string;
    projectID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      selectionID: string;
    }>;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteTrackMutationVariables = {
  input: DeleteTrackInput;
  condition?: ModelTrackConditionInput | null;
};

export type DeleteTrackMutation = {
  deleteTrack: {
    __typename: "Track";
    id: string;
    groupID: string;
    projectID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      selectionID: string;
    }>;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateSelectionMutationVariables = {
  input: CreateSelectionInput;
  condition?: ModelSelectionConditionInput | null;
};

export type CreateSelectionMutation = {
  createSelection: {
    __typename: "Selection";
    id: string;
    groupID: string;
    projectID: string;
    mediaID: string;
    trackID: string | null;
    role: string | null;
    type: MediaType | null;
    audio: {
      __typename: "AudioRegion";
      offset: number;
      duration: number;
    } | null;
    image: {
      __typename: "ImageCrop";
      aspect: number | null;
      x: number | null;
      y: number | null;
      width: number | null;
      height: number | null;
      unit: ImageUnits | null;
    } | null;
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    media: {
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateSelectionMutationVariables = {
  input: UpdateSelectionInput;
  condition?: ModelSelectionConditionInput | null;
};

export type UpdateSelectionMutation = {
  updateSelection: {
    __typename: "Selection";
    id: string;
    groupID: string;
    projectID: string;
    mediaID: string;
    trackID: string | null;
    role: string | null;
    type: MediaType | null;
    audio: {
      __typename: "AudioRegion";
      offset: number;
      duration: number;
    } | null;
    image: {
      __typename: "ImageCrop";
      aspect: number | null;
      x: number | null;
      y: number | null;
      width: number | null;
      height: number | null;
      unit: ImageUnits | null;
    } | null;
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    media: {
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteSelectionMutationVariables = {
  input: DeleteSelectionInput;
  condition?: ModelSelectionConditionInput | null;
};

export type DeleteSelectionMutation = {
  deleteSelection: {
    __typename: "Selection";
    id: string;
    groupID: string;
    projectID: string;
    mediaID: string;
    trackID: string | null;
    role: string | null;
    type: MediaType | null;
    audio: {
      __typename: "AudioRegion";
      offset: number;
      duration: number;
    } | null;
    image: {
      __typename: "ImageCrop";
      aspect: number | null;
      x: number | null;
      y: number | null;
      width: number | null;
      height: number | null;
      unit: ImageUnits | null;
    } | null;
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    media: {
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type SyncGroupsQueryVariables = {
  filter?: ModelGroupFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncGroupsQuery = {
  syncGroups: {
    __typename: "ModelGroupConnection";
    items: Array<{
      __typename: "Group";
      id: string;
      name: string;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetGroupQueryVariables = {
  id: string;
};

export type GetGroupQuery = {
  getGroup: {
    __typename: "Group";
    id: string;
    name: string;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListGroupsQueryVariables = {
  filter?: ModelGroupFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListGroupsQuery = {
  listGroups: {
    __typename: "ModelGroupConnection";
    items: Array<{
      __typename: "Group";
      id: string;
      name: string;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type SyncProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncProjectsQuery = {
  syncProjects: {
    __typename: "ModelProjectConnection";
    items: Array<{
      __typename: "Project";
      id: string;
      groupID: string;
      name: string;
      type: ProjectType;
      access: ProjetAccess;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      remix: {
        __typename: "RemixMetadata";
        bmp: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetProjectQueryVariables = {
  id: string;
};

export type GetProjectQuery = {
  getProject: {
    __typename: "Project";
    id: string;
    groupID: string;
    name: string;
    type: ProjectType;
    access: ProjetAccess;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    remix: {
      __typename: "RemixMetadata";
      bmp: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListProjectsQuery = {
  listProjects: {
    __typename: "ModelProjectConnection";
    items: Array<{
      __typename: "Project";
      id: string;
      groupID: string;
      name: string;
      type: ProjectType;
      access: ProjetAccess;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      remix: {
        __typename: "RemixMetadata";
        bmp: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type SyncMediaQueryVariables = {
  filter?: ModelMediaFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncMediaQuery = {
  syncMedia: {
    __typename: "ModelMediaConnection";
    items: Array<{
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetMediaQueryVariables = {
  id: string;
};

export type GetMediaQuery = {
  getMedia: {
    __typename: "Media";
    id: string;
    projectID: string;
    groupID: string;
    type: MediaType;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListMediasQueryVariables = {
  filter?: ModelMediaFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMediasQuery = {
  listMedias: {
    __typename: "ModelMediaConnection";
    items: Array<{
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type SyncTracksQueryVariables = {
  filter?: ModelTrackFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncTracksQuery = {
  syncTracks: {
    __typename: "ModelTrackConnection";
    items: Array<{
      __typename: "Track";
      id: string;
      groupID: string;
      projectID: string;
      meta: {
        __typename: "TrackMetadata";
        name: string | null;
        color: string | null;
        position: number | null;
        volume: number | null;
      };
      clips: Array<{
        __typename: "ClipMetadata";
        selectionID: string;
      }>;
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetTrackQueryVariables = {
  id: string;
};

export type GetTrackQuery = {
  getTrack: {
    __typename: "Track";
    id: string;
    groupID: string;
    projectID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      selectionID: string;
    }>;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListTracksQueryVariables = {
  filter?: ModelTrackFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListTracksQuery = {
  listTracks: {
    __typename: "ModelTrackConnection";
    items: Array<{
      __typename: "Track";
      id: string;
      groupID: string;
      projectID: string;
      meta: {
        __typename: "TrackMetadata";
        name: string | null;
        color: string | null;
        position: number | null;
        volume: number | null;
      };
      clips: Array<{
        __typename: "ClipMetadata";
        selectionID: string;
      }>;
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type SyncSelectionsQueryVariables = {
  filter?: ModelSelectionFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncSelectionsQuery = {
  syncSelections: {
    __typename: "ModelSelectionConnection";
    items: Array<{
      __typename: "Selection";
      id: string;
      groupID: string;
      projectID: string;
      mediaID: string;
      trackID: string | null;
      role: string | null;
      type: MediaType | null;
      audio: {
        __typename: "AudioRegion";
        offset: number;
        duration: number;
      } | null;
      image: {
        __typename: "ImageCrop";
        aspect: number | null;
        x: number | null;
        y: number | null;
        width: number | null;
        height: number | null;
        unit: ImageUnits | null;
      } | null;
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      } | null;
      createdAt: string | null;
      updatedAt: string | null;
      media: {
        __typename: "Media";
        id: string;
        projectID: string;
        groupID: string;
        type: MediaType;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetSelectionQueryVariables = {
  id: string;
};

export type GetSelectionQuery = {
  getSelection: {
    __typename: "Selection";
    id: string;
    groupID: string;
    projectID: string;
    mediaID: string;
    trackID: string | null;
    role: string | null;
    type: MediaType | null;
    audio: {
      __typename: "AudioRegion";
      offset: number;
      duration: number;
    } | null;
    image: {
      __typename: "ImageCrop";
      aspect: number | null;
      x: number | null;
      y: number | null;
      width: number | null;
      height: number | null;
      unit: ImageUnits | null;
    } | null;
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    media: {
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListSelectionsQueryVariables = {
  filter?: ModelSelectionFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListSelectionsQuery = {
  listSelections: {
    __typename: "ModelSelectionConnection";
    items: Array<{
      __typename: "Selection";
      id: string;
      groupID: string;
      projectID: string;
      mediaID: string;
      trackID: string | null;
      role: string | null;
      type: MediaType | null;
      audio: {
        __typename: "AudioRegion";
        offset: number;
        duration: number;
      } | null;
      image: {
        __typename: "ImageCrop";
        aspect: number | null;
        x: number | null;
        y: number | null;
        width: number | null;
        height: number | null;
        unit: ImageUnits | null;
      } | null;
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      } | null;
      createdAt: string | null;
      updatedAt: string | null;
      media: {
        __typename: "Media";
        id: string;
        projectID: string;
        groupID: string;
        type: MediaType;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type OnCreateGroupSubscription = {
  onCreateGroup: {
    __typename: "Group";
    id: string;
    name: string;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup: {
    __typename: "Group";
    id: string;
    name: string;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup: {
    __typename: "Group";
    id: string;
    name: string;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateProjectSubscription = {
  onCreateProject: {
    __typename: "Project";
    id: string;
    groupID: string;
    name: string;
    type: ProjectType;
    access: ProjetAccess;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    remix: {
      __typename: "RemixMetadata";
      bmp: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateProjectSubscription = {
  onUpdateProject: {
    __typename: "Project";
    id: string;
    groupID: string;
    name: string;
    type: ProjectType;
    access: ProjetAccess;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    remix: {
      __typename: "RemixMetadata";
      bmp: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteProjectSubscription = {
  onDeleteProject: {
    __typename: "Project";
    id: string;
    groupID: string;
    name: string;
    type: ProjectType;
    access: ProjetAccess;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    remix: {
      __typename: "RemixMetadata";
      bmp: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateMediaSubscription = {
  onCreateMedia: {
    __typename: "Media";
    id: string;
    projectID: string;
    groupID: string;
    type: MediaType;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateMediaSubscription = {
  onUpdateMedia: {
    __typename: "Media";
    id: string;
    projectID: string;
    groupID: string;
    type: MediaType;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteMediaSubscription = {
  onDeleteMedia: {
    __typename: "Media";
    id: string;
    projectID: string;
    groupID: string;
    type: MediaType;
    meta: {
      __typename: "Metadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      credits: string | null;
      licenses: string | null;
      readme: string | null;
    };
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    };
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateTrackSubscription = {
  onCreateTrack: {
    __typename: "Track";
    id: string;
    groupID: string;
    projectID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      selectionID: string;
    }>;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateTrackSubscription = {
  onUpdateTrack: {
    __typename: "Track";
    id: string;
    groupID: string;
    projectID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      selectionID: string;
    }>;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteTrackSubscription = {
  onDeleteTrack: {
    __typename: "Track";
    id: string;
    groupID: string;
    projectID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      selectionID: string;
    }>;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateSelectionSubscription = {
  onCreateSelection: {
    __typename: "Selection";
    id: string;
    groupID: string;
    projectID: string;
    mediaID: string;
    trackID: string | null;
    role: string | null;
    type: MediaType | null;
    audio: {
      __typename: "AudioRegion";
      offset: number;
      duration: number;
    } | null;
    image: {
      __typename: "ImageCrop";
      aspect: number | null;
      x: number | null;
      y: number | null;
      width: number | null;
      height: number | null;
      unit: ImageUnits | null;
    } | null;
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    media: {
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateSelectionSubscription = {
  onUpdateSelection: {
    __typename: "Selection";
    id: string;
    groupID: string;
    projectID: string;
    mediaID: string;
    trackID: string | null;
    role: string | null;
    type: MediaType | null;
    audio: {
      __typename: "AudioRegion";
      offset: number;
      duration: number;
    } | null;
    image: {
      __typename: "ImageCrop";
      aspect: number | null;
      x: number | null;
      y: number | null;
      width: number | null;
      height: number | null;
      unit: ImageUnits | null;
    } | null;
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    media: {
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteSelectionSubscription = {
  onDeleteSelection: {
    __typename: "Selection";
    id: string;
    groupID: string;
    projectID: string;
    mediaID: string;
    trackID: string | null;
    role: string | null;
    type: MediaType | null;
    audio: {
      __typename: "AudioRegion";
      offset: number;
      duration: number;
    } | null;
    image: {
      __typename: "ImageCrop";
      aspect: number | null;
      x: number | null;
      y: number | null;
      width: number | null;
      height: number | null;
      unit: ImageUnits | null;
    } | null;
    file: {
      __typename: "StoredFile";
      key: string;
      mimeType: string;
      fileName: string | null;
      fileSize: number | null;
      thumbnail: string | null;
      duration: number | null;
      width: number | null;
      height: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    media: {
      __typename: "Media";
      id: string;
      projectID: string;
      groupID: string;
      type: MediaType;
      meta: {
        __typename: "Metadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        credits: string | null;
        licenses: string | null;
        readme: string | null;
      };
      file: {
        __typename: "StoredFile";
        key: string;
        mimeType: string;
        fileName: string | null;
        fileSize: number | null;
        thumbnail: string | null;
        duration: number | null;
        width: number | null;
        height: number | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};
