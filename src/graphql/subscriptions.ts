/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
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
export const onCreateArchive = /* GraphQL */ `
  subscription OnCreateArchive {
    onCreateArchive {
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
export const onUpdateArchive = /* GraphQL */ `
  subscription OnUpdateArchive {
    onUpdateArchive {
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
export const onDeleteArchive = /* GraphQL */ `
  subscription OnDeleteArchive {
    onDeleteArchive {
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
export const onCreateRecording = /* GraphQL */ `
  subscription OnCreateRecording {
    onCreateRecording {
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
export const onUpdateRecording = /* GraphQL */ `
  subscription OnUpdateRecording {
    onUpdateRecording {
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
export const onDeleteRecording = /* GraphQL */ `
  subscription OnDeleteRecording {
    onDeleteRecording {
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
export const onCreateRemix = /* GraphQL */ `
  subscription OnCreateRemix {
    onCreateRemix {
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
export const onUpdateRemix = /* GraphQL */ `
  subscription OnUpdateRemix {
    onUpdateRemix {
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
export const onDeleteRemix = /* GraphQL */ `
  subscription OnDeleteRemix {
    onDeleteRemix {
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
export const onCreateTrack = /* GraphQL */ `
  subscription OnCreateTrack {
    onCreateTrack {
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
export const onUpdateTrack = /* GraphQL */ `
  subscription OnUpdateTrack {
    onUpdateTrack {
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
export const onDeleteTrack = /* GraphQL */ `
  subscription OnDeleteTrack {
    onDeleteTrack {
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
export const onCreateSample = /* GraphQL */ `
  subscription OnCreateSample {
    onCreateSample {
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
export const onUpdateSample = /* GraphQL */ `
  subscription OnUpdateSample {
    onUpdateSample {
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
export const onDeleteSample = /* GraphQL */ `
  subscription OnDeleteSample {
    onDeleteSample {
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
