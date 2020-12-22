/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
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
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia {
    onCreateMedia {
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
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia {
    onUpdateMedia {
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
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia {
    onDeleteMedia {
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
export const onCreateTrack = /* GraphQL */ `
  subscription OnCreateTrack {
    onCreateTrack {
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
export const onUpdateTrack = /* GraphQL */ `
  subscription OnUpdateTrack {
    onUpdateTrack {
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
export const onDeleteTrack = /* GraphQL */ `
  subscription OnDeleteTrack {
    onDeleteTrack {
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
export const onCreateSelection = /* GraphQL */ `
  subscription OnCreateSelection {
    onCreateSelection {
      id
      groupID
      projectID
      mediaID
      trackID
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      clip {
        keyboardKey
      }
      audioID
      audio {
        offset
        duration
      }
      audioFile {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      imageID
      image {
        aspect
        x
        y
        width
        height
        unit
      }
      imageFile {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      type
      coverID
      sampleID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSelection = /* GraphQL */ `
  subscription OnUpdateSelection {
    onUpdateSelection {
      id
      groupID
      projectID
      mediaID
      trackID
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      clip {
        keyboardKey
      }
      audioID
      audio {
        offset
        duration
      }
      audioFile {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      imageID
      image {
        aspect
        x
        y
        width
        height
        unit
      }
      imageFile {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      type
      coverID
      sampleID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSelection = /* GraphQL */ `
  subscription OnDeleteSelection {
    onDeleteSelection {
      id
      groupID
      projectID
      mediaID
      trackID
      meta {
        title
        description
        authors
        credits
        licenses
        readme
      }
      clip {
        keyboardKey
      }
      audioID
      audio {
        offset
        duration
      }
      audioFile {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      imageID
      image {
        aspect
        x
        y
        width
        height
        unit
      }
      imageFile {
        key
        mimeType
        fileName
        fileSize
        thumbnail
        duration
        width
        height
      }
      type
      coverID
      sampleID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
