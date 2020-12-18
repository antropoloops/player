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
      description
      image {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
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
      description
      image {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
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
      description
      image {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createArchive = /* GraphQL */ `
  mutation CreateArchive(
    $input: CreateArchiveInput!
    $condition: ModelArchiveConditionInput
  ) {
    createArchive(input: $input, condition: $condition) {
      id
      groupID
      name
      access
      createdAt
      updatedAt
      group {
        id
        name
        description
        image {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      recordings {
        items {
          id
          archiveID
          groupID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateArchive = /* GraphQL */ `
  mutation UpdateArchive(
    $input: UpdateArchiveInput!
    $condition: ModelArchiveConditionInput
  ) {
    updateArchive(input: $input, condition: $condition) {
      id
      groupID
      name
      access
      createdAt
      updatedAt
      group {
        id
        name
        description
        image {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      recordings {
        items {
          id
          archiveID
          groupID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteArchive = /* GraphQL */ `
  mutation DeleteArchive(
    $input: DeleteArchiveInput!
    $condition: ModelArchiveConditionInput
  ) {
    deleteArchive(input: $input, condition: $condition) {
      id
      groupID
      name
      access
      createdAt
      updatedAt
      group {
        id
        name
        description
        image {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      recordings {
        items {
          id
          archiveID
          groupID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createRecording = /* GraphQL */ `
  mutation CreateRecording(
    $input: CreateRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    createRecording(input: $input, condition: $condition) {
      id
      archiveID
      groupID
      meta {
        title
        description
      }
      audio {
        key
        type
        name
        thumbnail
        size
        duration
      }
      images {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
      }
      createdAt
      updatedAt
      archive {
        id
        groupID
        name
        access
        createdAt
        updatedAt
        group {
          id
          name
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        recordings {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      samples {
        items {
          id
          groupID
          remixID
          recordingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateRecording = /* GraphQL */ `
  mutation UpdateRecording(
    $input: UpdateRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    updateRecording(input: $input, condition: $condition) {
      id
      archiveID
      groupID
      meta {
        title
        description
      }
      audio {
        key
        type
        name
        thumbnail
        size
        duration
      }
      images {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
      }
      createdAt
      updatedAt
      archive {
        id
        groupID
        name
        access
        createdAt
        updatedAt
        group {
          id
          name
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        recordings {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      samples {
        items {
          id
          groupID
          remixID
          recordingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteRecording = /* GraphQL */ `
  mutation DeleteRecording(
    $input: DeleteRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    deleteRecording(input: $input, condition: $condition) {
      id
      archiveID
      groupID
      meta {
        title
        description
      }
      audio {
        key
        type
        name
        thumbnail
        size
        duration
      }
      images {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
      }
      createdAt
      updatedAt
      archive {
        id
        groupID
        name
        access
        createdAt
        updatedAt
        group {
          id
          name
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        recordings {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      samples {
        items {
          id
          groupID
          remixID
          recordingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createRemix = /* GraphQL */ `
  mutation CreateRemix(
    $input: CreateRemixInput!
    $condition: ModelRemixConditionInput
  ) {
    createRemix(input: $input, condition: $condition) {
      id
      groupID
      name
      meta {
        title
        description
        authors
        bmp
      }
      images {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
      }
      createdAt
      updatedAt
      tracks {
        items {
          id
          groupID
          remixID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      samples {
        items {
          id
          groupID
          remixID
          recordingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateRemix = /* GraphQL */ `
  mutation UpdateRemix(
    $input: UpdateRemixInput!
    $condition: ModelRemixConditionInput
  ) {
    updateRemix(input: $input, condition: $condition) {
      id
      groupID
      name
      meta {
        title
        description
        authors
        bmp
      }
      images {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
      }
      createdAt
      updatedAt
      tracks {
        items {
          id
          groupID
          remixID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      samples {
        items {
          id
          groupID
          remixID
          recordingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteRemix = /* GraphQL */ `
  mutation DeleteRemix(
    $input: DeleteRemixInput!
    $condition: ModelRemixConditionInput
  ) {
    deleteRemix(input: $input, condition: $condition) {
      id
      groupID
      name
      meta {
        title
        description
        authors
        bmp
      }
      images {
        key
        type
        role
        name
        thumbnail
        size
        width
        height
      }
      createdAt
      updatedAt
      tracks {
        items {
          id
          groupID
          remixID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      samples {
        items {
          id
          groupID
          remixID
          recordingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
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
      remixID
      meta {
        name
        color
        position
        volume
      }
      clips {
        sampleID
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
      remixID
      meta {
        name
        color
        position
        volume
      }
      clips {
        sampleID
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
      remixID
      meta {
        name
        color
        position
        volume
      }
      clips {
        sampleID
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSample = /* GraphQL */ `
  mutation CreateSample(
    $input: CreateSampleInput!
    $condition: ModelSampleConditionInput
  ) {
    createSample(input: $input, condition: $condition) {
      id
      groupID
      remixID
      recordingID
      region {
        offset
        duration
      }
      audio {
        key
        type
        name
        thumbnail
        size
        duration
      }
      createdAt
      updatedAt
      recording {
        id
        archiveID
        groupID
        meta {
          title
          description
        }
        audio {
          key
          type
          name
          thumbnail
          size
          duration
        }
        images {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        createdAt
        updatedAt
        archive {
          id
          groupID
          name
          access
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        samples {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      remix {
        id
        groupID
        name
        meta {
          title
          description
          authors
          bmp
        }
        images {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        createdAt
        updatedAt
        tracks {
          nextToken
          startedAt
        }
        samples {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSample = /* GraphQL */ `
  mutation UpdateSample(
    $input: UpdateSampleInput!
    $condition: ModelSampleConditionInput
  ) {
    updateSample(input: $input, condition: $condition) {
      id
      groupID
      remixID
      recordingID
      region {
        offset
        duration
      }
      audio {
        key
        type
        name
        thumbnail
        size
        duration
      }
      createdAt
      updatedAt
      recording {
        id
        archiveID
        groupID
        meta {
          title
          description
        }
        audio {
          key
          type
          name
          thumbnail
          size
          duration
        }
        images {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        createdAt
        updatedAt
        archive {
          id
          groupID
          name
          access
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        samples {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      remix {
        id
        groupID
        name
        meta {
          title
          description
          authors
          bmp
        }
        images {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        createdAt
        updatedAt
        tracks {
          nextToken
          startedAt
        }
        samples {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSample = /* GraphQL */ `
  mutation DeleteSample(
    $input: DeleteSampleInput!
    $condition: ModelSampleConditionInput
  ) {
    deleteSample(input: $input, condition: $condition) {
      id
      groupID
      remixID
      recordingID
      region {
        offset
        duration
      }
      audio {
        key
        type
        name
        thumbnail
        size
        duration
      }
      createdAt
      updatedAt
      recording {
        id
        archiveID
        groupID
        meta {
          title
          description
        }
        audio {
          key
          type
          name
          thumbnail
          size
          duration
        }
        images {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        createdAt
        updatedAt
        archive {
          id
          groupID
          name
          access
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        samples {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      remix {
        id
        groupID
        name
        meta {
          title
          description
          authors
          bmp
        }
        images {
          key
          type
          role
          name
          thumbnail
          size
          width
          height
        }
        createdAt
        updatedAt
        tracks {
          nextToken
          startedAt
        }
        samples {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
