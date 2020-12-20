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
      nextToken
      startedAt
    }
  }
`;
export const syncProjects = /* GraphQL */ `
  query SyncProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          bmp
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
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
        bmp
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          bmp
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
export const syncMedia = /* GraphQL */ `
  query SyncMedia(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMedia(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        projectID
        groupID
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
      nextToken
      startedAt
    }
  }
`;
export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      projectID
      groupID
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
export const listMedias = /* GraphQL */ `
  query ListMedias(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        projectID
        groupID
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
      nextToken
      startedAt
    }
  }
`;
export const syncSelections = /* GraphQL */ `
  query SyncSelections(
    $filter: ModelSelectionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSelections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        groupID
        projectID
        mediaID
        trackID
        role
        type
        audio {
          offset
          duration
        }
        image {
          aspect
          x
          y
          width
          height
          unit
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
        media {
          id
          projectID
          groupID
          type
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
export const getSelection = /* GraphQL */ `
  query GetSelection($id: ID!) {
    getSelection(id: $id) {
      id
      groupID
      projectID
      mediaID
      trackID
      role
      type
      audio {
        offset
        duration
      }
      image {
        aspect
        x
        y
        width
        height
        unit
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
      media {
        id
        projectID
        groupID
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
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSelections = /* GraphQL */ `
  query ListSelections(
    $filter: ModelSelectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSelections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupID
        projectID
        mediaID
        trackID
        role
        type
        audio {
          offset
          duration
        }
        image {
          aspect
          x
          y
          width
          height
          unit
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
        media {
          id
          projectID
          groupID
          type
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
