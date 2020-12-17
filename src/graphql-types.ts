/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGroupInput = {
  id?: string | null;
  name: string;
  description?: string | null;
  _version?: number | null;
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
  _version?: number | null;
};

export type DeleteGroupInput = {
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
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

export type OnCreateGroupSubscription = {
  onCreateGroup: {
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
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup: {
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
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup: {
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
};
