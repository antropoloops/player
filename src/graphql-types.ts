/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGroupInput = {
  id?: string | null;
  name: string;
  description?: string | null;
  image?: Array<StoredImageInput> | null;
  _version?: number | null;
};

export type StoredImageInput = {
  key: string;
  type: string;
  role?: string | null;
  name?: string | null;
  thumbnail?: string | null;
  size?: number | null;
  width?: number | null;
  height?: number | null;
};

export type ModelGroupConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
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
  description?: string | null;
  image?: Array<StoredImageInput> | null;
  _version?: number | null;
};

export type DeleteGroupInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateArchiveInput = {
  id?: string | null;
  groupID: string;
  name: string;
  access: ArchiveAccess;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export enum ArchiveAccess {
  private = "private",
  public = "public",
}

export type ModelArchiveConditionInput = {
  groupID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  access?: ModelArchiveAccessInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelArchiveConditionInput | null> | null;
  or?: Array<ModelArchiveConditionInput | null> | null;
  not?: ModelArchiveConditionInput | null;
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

export type ModelArchiveAccessInput = {
  eq?: ArchiveAccess | null;
  ne?: ArchiveAccess | null;
};

export type UpdateArchiveInput = {
  id: string;
  groupID?: string | null;
  name?: string | null;
  access?: ArchiveAccess | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteArchiveInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateRecordingInput = {
  id?: string | null;
  archiveID: string;
  groupID: string;
  meta: RecordingMetaInput;
  audio?: StoredAudioInput | null;
  images?: Array<StoredImageInput> | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type RecordingMetaInput = {
  title?: string | null;
  description?: string | null;
};

export type StoredAudioInput = {
  key: string;
  type: string;
  name?: string | null;
  thumbnail?: string | null;
  size?: number | null;
  duration?: number | null;
};

export type ModelRecordingConditionInput = {
  archiveID?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelRecordingConditionInput | null> | null;
  or?: Array<ModelRecordingConditionInput | null> | null;
  not?: ModelRecordingConditionInput | null;
};

export type UpdateRecordingInput = {
  id: string;
  archiveID?: string | null;
  groupID?: string | null;
  meta?: RecordingMetaInput | null;
  audio?: StoredAudioInput | null;
  images?: Array<StoredImageInput> | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteRecordingInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateRemixInput = {
  id?: string | null;
  groupID: string;
  name?: string | null;
  meta: RemixMetadataInput;
  images?: Array<StoredImageInput> | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type RemixMetadataInput = {
  title?: string | null;
  description?: string | null;
  authors?: string | null;
  bmp?: number | null;
};

export type ModelRemixConditionInput = {
  groupID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelRemixConditionInput | null> | null;
  or?: Array<ModelRemixConditionInput | null> | null;
  not?: ModelRemixConditionInput | null;
};

export type UpdateRemixInput = {
  id: string;
  groupID?: string | null;
  name?: string | null;
  meta?: RemixMetadataInput | null;
  images?: Array<StoredImageInput> | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteRemixInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateTrackInput = {
  id?: string | null;
  groupID: string;
  remixID: string;
  meta: TrackMetadataInput;
  clips?: Array<ClipMetadataInput> | null;
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
  sampleID: string;
};

export type ModelTrackConditionInput = {
  groupID?: ModelIDInput | null;
  remixID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelTrackConditionInput | null> | null;
  or?: Array<ModelTrackConditionInput | null> | null;
  not?: ModelTrackConditionInput | null;
};

export type UpdateTrackInput = {
  id: string;
  groupID?: string | null;
  remixID?: string | null;
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

export type CreateSampleInput = {
  id?: string | null;
  groupID: string;
  remixID: string;
  recordingID: string;
  region: SampleRegionInput;
  audio?: StoredAudioInput | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type SampleRegionInput = {
  offset: number;
  duration: number;
};

export type ModelSampleConditionInput = {
  groupID?: ModelIDInput | null;
  remixID?: ModelIDInput | null;
  recordingID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelSampleConditionInput | null> | null;
  or?: Array<ModelSampleConditionInput | null> | null;
  not?: ModelSampleConditionInput | null;
};

export type UpdateSampleInput = {
  id: string;
  groupID?: string | null;
  remixID?: string | null;
  recordingID?: string | null;
  region?: SampleRegionInput | null;
  audio?: StoredAudioInput | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteSampleInput = {
  id?: string | null;
  _version?: number | null;
};

export type ModelGroupFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelGroupFilterInput | null> | null;
  or?: Array<ModelGroupFilterInput | null> | null;
  not?: ModelGroupFilterInput | null;
};

export type ModelArchiveFilterInput = {
  id?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  access?: ModelArchiveAccessInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelArchiveFilterInput | null> | null;
  or?: Array<ModelArchiveFilterInput | null> | null;
  not?: ModelArchiveFilterInput | null;
};

export type ModelRecordingFilterInput = {
  id?: ModelIDInput | null;
  archiveID?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelRecordingFilterInput | null> | null;
  or?: Array<ModelRecordingFilterInput | null> | null;
  not?: ModelRecordingFilterInput | null;
};

export type ModelRemixFilterInput = {
  id?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelRemixFilterInput | null> | null;
  or?: Array<ModelRemixFilterInput | null> | null;
  not?: ModelRemixFilterInput | null;
};

export type ModelTrackFilterInput = {
  id?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  remixID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelTrackFilterInput | null> | null;
  or?: Array<ModelTrackFilterInput | null> | null;
  not?: ModelTrackFilterInput | null;
};

export type ModelSampleFilterInput = {
  id?: ModelIDInput | null;
  groupID?: ModelIDInput | null;
  remixID?: ModelIDInput | null;
  recordingID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelSampleFilterInput | null> | null;
  or?: Array<ModelSampleFilterInput | null> | null;
  not?: ModelSampleFilterInput | null;
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
    description: string | null;
    image: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
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
    description: string | null;
    image: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
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
    description: string | null;
    image: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateArchiveMutationVariables = {
  input: CreateArchiveInput;
  condition?: ModelArchiveConditionInput | null;
};

export type CreateArchiveMutation = {
  createArchive: {
    __typename: "Archive";
    id: string;
    groupID: string;
    name: string;
    access: ArchiveAccess;
    createdAt: string | null;
    updatedAt: string | null;
    group: {
      __typename: "Group";
      id: string;
      name: string;
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    recordings: {
      __typename: "ModelRecordingConnection";
      items: Array<{
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateArchiveMutationVariables = {
  input: UpdateArchiveInput;
  condition?: ModelArchiveConditionInput | null;
};

export type UpdateArchiveMutation = {
  updateArchive: {
    __typename: "Archive";
    id: string;
    groupID: string;
    name: string;
    access: ArchiveAccess;
    createdAt: string | null;
    updatedAt: string | null;
    group: {
      __typename: "Group";
      id: string;
      name: string;
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    recordings: {
      __typename: "ModelRecordingConnection";
      items: Array<{
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteArchiveMutationVariables = {
  input: DeleteArchiveInput;
  condition?: ModelArchiveConditionInput | null;
};

export type DeleteArchiveMutation = {
  deleteArchive: {
    __typename: "Archive";
    id: string;
    groupID: string;
    name: string;
    access: ArchiveAccess;
    createdAt: string | null;
    updatedAt: string | null;
    group: {
      __typename: "Group";
      id: string;
      name: string;
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    recordings: {
      __typename: "ModelRecordingConnection";
      items: Array<{
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateRecordingMutationVariables = {
  input: CreateRecordingInput;
  condition?: ModelRecordingConditionInput | null;
};

export type CreateRecordingMutation = {
  createRecording: {
    __typename: "Recording";
    id: string;
    archiveID: string;
    groupID: string;
    meta: {
      __typename: "RecordingMeta";
      title: string | null;
      description: string | null;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    archive: {
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateRecordingMutationVariables = {
  input: UpdateRecordingInput;
  condition?: ModelRecordingConditionInput | null;
};

export type UpdateRecordingMutation = {
  updateRecording: {
    __typename: "Recording";
    id: string;
    archiveID: string;
    groupID: string;
    meta: {
      __typename: "RecordingMeta";
      title: string | null;
      description: string | null;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    archive: {
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteRecordingMutationVariables = {
  input: DeleteRecordingInput;
  condition?: ModelRecordingConditionInput | null;
};

export type DeleteRecordingMutation = {
  deleteRecording: {
    __typename: "Recording";
    id: string;
    archiveID: string;
    groupID: string;
    meta: {
      __typename: "RecordingMeta";
      title: string | null;
      description: string | null;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    archive: {
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateRemixMutationVariables = {
  input: CreateRemixInput;
  condition?: ModelRemixConditionInput | null;
};

export type CreateRemixMutation = {
  createRemix: {
    __typename: "Remix";
    id: string;
    groupID: string;
    name: string | null;
    meta: {
      __typename: "RemixMetadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      bmp: number | null;
    };
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    tracks: {
      __typename: "ModelTrackConnection";
      items: Array<{
        __typename: "Track";
        id: string;
        groupID: string;
        remixID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateRemixMutationVariables = {
  input: UpdateRemixInput;
  condition?: ModelRemixConditionInput | null;
};

export type UpdateRemixMutation = {
  updateRemix: {
    __typename: "Remix";
    id: string;
    groupID: string;
    name: string | null;
    meta: {
      __typename: "RemixMetadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      bmp: number | null;
    };
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    tracks: {
      __typename: "ModelTrackConnection";
      items: Array<{
        __typename: "Track";
        id: string;
        groupID: string;
        remixID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteRemixMutationVariables = {
  input: DeleteRemixInput;
  condition?: ModelRemixConditionInput | null;
};

export type DeleteRemixMutation = {
  deleteRemix: {
    __typename: "Remix";
    id: string;
    groupID: string;
    name: string | null;
    meta: {
      __typename: "RemixMetadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      bmp: number | null;
    };
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    tracks: {
      __typename: "ModelTrackConnection";
      items: Array<{
        __typename: "Track";
        id: string;
        groupID: string;
        remixID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
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
    remixID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      sampleID: string;
    }> | null;
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
    remixID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      sampleID: string;
    }> | null;
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
    remixID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      sampleID: string;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateSampleMutationVariables = {
  input: CreateSampleInput;
  condition?: ModelSampleConditionInput | null;
};

export type CreateSampleMutation = {
  createSample: {
    __typename: "Sample";
    id: string;
    groupID: string;
    remixID: string;
    recordingID: string;
    region: {
      __typename: "SampleRegion";
      offset: number;
      duration: number;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    recording: {
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    remix: {
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateSampleMutationVariables = {
  input: UpdateSampleInput;
  condition?: ModelSampleConditionInput | null;
};

export type UpdateSampleMutation = {
  updateSample: {
    __typename: "Sample";
    id: string;
    groupID: string;
    remixID: string;
    recordingID: string;
    region: {
      __typename: "SampleRegion";
      offset: number;
      duration: number;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    recording: {
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    remix: {
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteSampleMutationVariables = {
  input: DeleteSampleInput;
  condition?: ModelSampleConditionInput | null;
};

export type DeleteSampleMutation = {
  deleteSample: {
    __typename: "Sample";
    id: string;
    groupID: string;
    remixID: string;
    recordingID: string;
    region: {
      __typename: "SampleRegion";
      offset: number;
      duration: number;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    recording: {
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    remix: {
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
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
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
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
    description: string | null;
    image: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
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
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
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

export type SyncArchivesQueryVariables = {
  filter?: ModelArchiveFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncArchivesQuery = {
  syncArchives: {
    __typename: "ModelArchiveConnection";
    items: Array<{
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetArchiveQueryVariables = {
  id: string;
};

export type GetArchiveQuery = {
  getArchive: {
    __typename: "Archive";
    id: string;
    groupID: string;
    name: string;
    access: ArchiveAccess;
    createdAt: string | null;
    updatedAt: string | null;
    group: {
      __typename: "Group";
      id: string;
      name: string;
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    recordings: {
      __typename: "ModelRecordingConnection";
      items: Array<{
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListArchivesQueryVariables = {
  filter?: ModelArchiveFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListArchivesQuery = {
  listArchives: {
    __typename: "ModelArchiveConnection";
    items: Array<{
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type SyncRecordingsQueryVariables = {
  filter?: ModelRecordingFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncRecordingsQuery = {
  syncRecordings: {
    __typename: "ModelRecordingConnection";
    items: Array<{
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetRecordingQueryVariables = {
  id: string;
};

export type GetRecordingQuery = {
  getRecording: {
    __typename: "Recording";
    id: string;
    archiveID: string;
    groupID: string;
    meta: {
      __typename: "RecordingMeta";
      title: string | null;
      description: string | null;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    archive: {
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListRecordingsQueryVariables = {
  filter?: ModelRecordingFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListRecordingsQuery = {
  listRecordings: {
    __typename: "ModelRecordingConnection";
    items: Array<{
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type SyncRemixesQueryVariables = {
  filter?: ModelRemixFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncRemixesQuery = {
  syncRemixes: {
    __typename: "ModelRemixConnection";
    items: Array<{
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetRemixQueryVariables = {
  id: string;
};

export type GetRemixQuery = {
  getRemix: {
    __typename: "Remix";
    id: string;
    groupID: string;
    name: string | null;
    meta: {
      __typename: "RemixMetadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      bmp: number | null;
    };
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    tracks: {
      __typename: "ModelTrackConnection";
      items: Array<{
        __typename: "Track";
        id: string;
        groupID: string;
        remixID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListRemixsQueryVariables = {
  filter?: ModelRemixFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListRemixsQuery = {
  listRemixs: {
    __typename: "ModelRemixConnection";
    items: Array<{
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
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
      remixID: string;
      meta: {
        __typename: "TrackMetadata";
        name: string | null;
        color: string | null;
        position: number | null;
        volume: number | null;
      };
      clips: Array<{
        __typename: "ClipMetadata";
        sampleID: string;
      }> | null;
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
    remixID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      sampleID: string;
    }> | null;
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
      remixID: string;
      meta: {
        __typename: "TrackMetadata";
        name: string | null;
        color: string | null;
        position: number | null;
        volume: number | null;
      };
      clips: Array<{
        __typename: "ClipMetadata";
        sampleID: string;
      }> | null;
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

export type SyncSamplesQueryVariables = {
  filter?: ModelSampleFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncSamplesQuery = {
  syncSamples: {
    __typename: "ModelSampleConnection";
    items: Array<{
      __typename: "Sample";
      id: string;
      groupID: string;
      remixID: string;
      recordingID: string;
      region: {
        __typename: "SampleRegion";
        offset: number;
        duration: number;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      createdAt: string | null;
      updatedAt: string | null;
      recording: {
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      remix: {
        __typename: "Remix";
        id: string;
        groupID: string;
        name: string | null;
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

export type GetSampleQueryVariables = {
  id: string;
};

export type GetSampleQuery = {
  getSample: {
    __typename: "Sample";
    id: string;
    groupID: string;
    remixID: string;
    recordingID: string;
    region: {
      __typename: "SampleRegion";
      offset: number;
      duration: number;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    recording: {
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    remix: {
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListSamplesQueryVariables = {
  filter?: ModelSampleFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListSamplesQuery = {
  listSamples: {
    __typename: "ModelSampleConnection";
    items: Array<{
      __typename: "Sample";
      id: string;
      groupID: string;
      remixID: string;
      recordingID: string;
      region: {
        __typename: "SampleRegion";
        offset: number;
        duration: number;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      createdAt: string | null;
      updatedAt: string | null;
      recording: {
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      remix: {
        __typename: "Remix";
        id: string;
        groupID: string;
        name: string | null;
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
    description: string | null;
    image: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
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
    description: string | null;
    image: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
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
    description: string | null;
    image: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateArchiveSubscription = {
  onCreateArchive: {
    __typename: "Archive";
    id: string;
    groupID: string;
    name: string;
    access: ArchiveAccess;
    createdAt: string | null;
    updatedAt: string | null;
    group: {
      __typename: "Group";
      id: string;
      name: string;
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    recordings: {
      __typename: "ModelRecordingConnection";
      items: Array<{
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateArchiveSubscription = {
  onUpdateArchive: {
    __typename: "Archive";
    id: string;
    groupID: string;
    name: string;
    access: ArchiveAccess;
    createdAt: string | null;
    updatedAt: string | null;
    group: {
      __typename: "Group";
      id: string;
      name: string;
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    recordings: {
      __typename: "ModelRecordingConnection";
      items: Array<{
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteArchiveSubscription = {
  onDeleteArchive: {
    __typename: "Archive";
    id: string;
    groupID: string;
    name: string;
    access: ArchiveAccess;
    createdAt: string | null;
    updatedAt: string | null;
    group: {
      __typename: "Group";
      id: string;
      name: string;
      description: string | null;
      image: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    recordings: {
      __typename: "ModelRecordingConnection";
      items: Array<{
        __typename: "Recording";
        id: string;
        archiveID: string;
        groupID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateRecordingSubscription = {
  onCreateRecording: {
    __typename: "Recording";
    id: string;
    archiveID: string;
    groupID: string;
    meta: {
      __typename: "RecordingMeta";
      title: string | null;
      description: string | null;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    archive: {
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateRecordingSubscription = {
  onUpdateRecording: {
    __typename: "Recording";
    id: string;
    archiveID: string;
    groupID: string;
    meta: {
      __typename: "RecordingMeta";
      title: string | null;
      description: string | null;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    archive: {
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteRecordingSubscription = {
  onDeleteRecording: {
    __typename: "Recording";
    id: string;
    archiveID: string;
    groupID: string;
    meta: {
      __typename: "RecordingMeta";
      title: string | null;
      description: string | null;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    archive: {
      __typename: "Archive";
      id: string;
      groupID: string;
      name: string;
      access: ArchiveAccess;
      createdAt: string | null;
      updatedAt: string | null;
      group: {
        __typename: "Group";
        id: string;
        name: string;
        description: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      recordings: {
        __typename: "ModelRecordingConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateRemixSubscription = {
  onCreateRemix: {
    __typename: "Remix";
    id: string;
    groupID: string;
    name: string | null;
    meta: {
      __typename: "RemixMetadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      bmp: number | null;
    };
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    tracks: {
      __typename: "ModelTrackConnection";
      items: Array<{
        __typename: "Track";
        id: string;
        groupID: string;
        remixID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateRemixSubscription = {
  onUpdateRemix: {
    __typename: "Remix";
    id: string;
    groupID: string;
    name: string | null;
    meta: {
      __typename: "RemixMetadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      bmp: number | null;
    };
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    tracks: {
      __typename: "ModelTrackConnection";
      items: Array<{
        __typename: "Track";
        id: string;
        groupID: string;
        remixID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteRemixSubscription = {
  onDeleteRemix: {
    __typename: "Remix";
    id: string;
    groupID: string;
    name: string | null;
    meta: {
      __typename: "RemixMetadata";
      title: string | null;
      description: string | null;
      authors: string | null;
      bmp: number | null;
    };
    images: Array<{
      __typename: "StoredImage";
      key: string;
      type: string;
      role: string | null;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    tracks: {
      __typename: "ModelTrackConnection";
      items: Array<{
        __typename: "Track";
        id: string;
        groupID: string;
        remixID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    samples: {
      __typename: "ModelSampleConnection";
      items: Array<{
        __typename: "Sample";
        id: string;
        groupID: string;
        remixID: string;
        recordingID: string;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null> | null;
      nextToken: string | null;
      startedAt: number | null;
    } | null;
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
    remixID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      sampleID: string;
    }> | null;
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
    remixID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      sampleID: string;
    }> | null;
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
    remixID: string;
    meta: {
      __typename: "TrackMetadata";
      name: string | null;
      color: string | null;
      position: number | null;
      volume: number | null;
    };
    clips: Array<{
      __typename: "ClipMetadata";
      sampleID: string;
    }> | null;
    createdAt: string | null;
    updatedAt: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateSampleSubscription = {
  onCreateSample: {
    __typename: "Sample";
    id: string;
    groupID: string;
    remixID: string;
    recordingID: string;
    region: {
      __typename: "SampleRegion";
      offset: number;
      duration: number;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    recording: {
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    remix: {
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateSampleSubscription = {
  onUpdateSample: {
    __typename: "Sample";
    id: string;
    groupID: string;
    remixID: string;
    recordingID: string;
    region: {
      __typename: "SampleRegion";
      offset: number;
      duration: number;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    recording: {
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    remix: {
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteSampleSubscription = {
  onDeleteSample: {
    __typename: "Sample";
    id: string;
    groupID: string;
    remixID: string;
    recordingID: string;
    region: {
      __typename: "SampleRegion";
      offset: number;
      duration: number;
    };
    audio: {
      __typename: "StoredAudio";
      key: string;
      type: string;
      name: string | null;
      thumbnail: string | null;
      size: number | null;
      duration: number | null;
    } | null;
    createdAt: string | null;
    updatedAt: string | null;
    recording: {
      __typename: "Recording";
      id: string;
      archiveID: string;
      groupID: string;
      meta: {
        __typename: "RecordingMeta";
        title: string | null;
        description: string | null;
      };
      audio: {
        __typename: "StoredAudio";
        key: string;
        type: string;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        duration: number | null;
      } | null;
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      archive: {
        __typename: "Archive";
        id: string;
        groupID: string;
        name: string;
        access: ArchiveAccess;
        createdAt: string | null;
        updatedAt: string | null;
        _version: number;
        _deleted: boolean | null;
        _lastChangedAt: number;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    remix: {
      __typename: "Remix";
      id: string;
      groupID: string;
      name: string | null;
      meta: {
        __typename: "RemixMetadata";
        title: string | null;
        description: string | null;
        authors: string | null;
        bmp: number | null;
      };
      images: Array<{
        __typename: "StoredImage";
        key: string;
        type: string;
        role: string | null;
        name: string | null;
        thumbnail: string | null;
        size: number | null;
        width: number | null;
        height: number | null;
      }> | null;
      createdAt: string | null;
      updatedAt: string | null;
      tracks: {
        __typename: "ModelTrackConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      samples: {
        __typename: "ModelSampleConnection";
        nextToken: string | null;
        startedAt: number | null;
      } | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
};
