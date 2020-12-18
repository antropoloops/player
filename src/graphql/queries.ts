/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncGroups = /* GraphQL */ `
  query SyncGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
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
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncArchives = /* GraphQL */ `
  query SyncArchives(
    $filter: ModelArchiveFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncArchives(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getArchive = /* GraphQL */ `
  query GetArchive($id: ID!) {
    getArchive(id: $id) {
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
export const listArchives = /* GraphQL */ `
  query ListArchives(
    $filter: ModelArchiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArchives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncRecordings = /* GraphQL */ `
  query SyncRecordings(
    $filter: ModelRecordingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRecordings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getRecording = /* GraphQL */ `
  query GetRecording($id: ID!) {
    getRecording(id: $id) {
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
export const listRecordings = /* GraphQL */ `
  query ListRecordings(
    $filter: ModelRecordingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncRemixes = /* GraphQL */ `
  query SyncRemixes(
    $filter: ModelRemixFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRemixes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getRemix = /* GraphQL */ `
  query GetRemix($id: ID!) {
    getRemix(id: $id) {
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
export const listRemixs = /* GraphQL */ `
  query ListRemixs(
    $filter: ModelRemixFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRemixs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncTracks = /* GraphQL */ `
  query SyncTracks(
    $filter: ModelTrackFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTracks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getTrack = /* GraphQL */ `
  query GetTrack($id: ID!) {
    getTrack(id: $id) {
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
export const listTracks = /* GraphQL */ `
  query ListTracks(
    $filter: ModelTrackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTracks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSamples = /* GraphQL */ `
  query SyncSamples(
    $filter: ModelSampleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSamples(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        remix {
          id
          groupID
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSample = /* GraphQL */ `
  query GetSample($id: ID!) {
    getSample(id: $id) {
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
export const listSamples = /* GraphQL */ `
  query ListSamples(
    $filter: ModelSampleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSamples(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        remix {
          id
          groupID
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
