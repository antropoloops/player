/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      id
      name
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      id
      name
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      id
      name
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      groupID
      type
      access
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      remix {
        bpm
      }
      image {
        original {
          mediaID
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      groupID
      type
      access
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      remix {
        bpm
      }
      image {
        original {
          mediaID
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      groupID
      type
      access
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      remix {
        bpm
      }
      image {
        original {
          mediaID
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createMedia = /* GraphQL */ `
  mutation CreateMedia(
    $input: CreateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    createMedia(input: $input, condition: $condition) {
      id
      groupID
      projectID
      type
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      file {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMedia = /* GraphQL */ `
  mutation UpdateMedia(
    $input: UpdateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    updateMedia(input: $input, condition: $condition) {
      id
      groupID
      projectID
      type
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      file {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMedia = /* GraphQL */ `
  mutation DeleteMedia(
    $input: DeleteMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    deleteMedia(input: $input, condition: $condition) {
      id
      groupID
      projectID
      type
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      file {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTrack = /* GraphQL */ `
  mutation CreateTrack(
    $input: CreateTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    createTrack(input: $input, condition: $condition) {
      id
      groupID
      projectID
      meta {
        name
        color
        position
        volume
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTrack = /* GraphQL */ `
  mutation UpdateTrack(
    $input: UpdateTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    updateTrack(input: $input, condition: $condition) {
      id
      groupID
      projectID
      meta {
        name
        color
        position
        volume
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTrack = /* GraphQL */ `
  mutation DeleteTrack(
    $input: DeleteTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    deleteTrack(input: $input, condition: $condition) {
      id
      groupID
      projectID
      meta {
        name
        color
        position
        volume
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createClip = /* GraphQL */ `
  mutation CreateClip(
    $input: CreateClipInput!
    $condition: ModelClipConditionInput
  ) {
    createClip(input: $input, condition: $condition) {
      id
      groupID
      projectID
      trackID
      meta {
        name
        keyboardKey
      }
      audio {
        original {
          mediaID
        }
      }
      image {
        original {
          mediaID
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateClip = /* GraphQL */ `
  mutation UpdateClip(
    $input: UpdateClipInput!
    $condition: ModelClipConditionInput
  ) {
    updateClip(input: $input, condition: $condition) {
      id
      groupID
      projectID
      trackID
      meta {
        name
        keyboardKey
      }
      audio {
        original {
          mediaID
        }
      }
      image {
        original {
          mediaID
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteClip = /* GraphQL */ `
  mutation DeleteClip(
    $input: DeleteClipInput!
    $condition: ModelClipConditionInput
  ) {
    deleteClip(input: $input, condition: $condition) {
      id
      groupID
      projectID
      trackID
      meta {
        name
        keyboardKey
      }
      audio {
        original {
          mediaID
        }
      }
      image {
        original {
          mediaID
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
