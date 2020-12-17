export const schema = {
  models: {
    Group: {
      name: "Group",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        description: {
          name: "description",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        image: {
          name: "image",
          isArray: true,
          type: {
            nonModel: "StoredImage",
          },
          isRequired: true,
          attributes: [],
          isArrayNullable: true,
        },
      },
      syncable: true,
      pluralName: "Groups",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
    Archive: {
      name: "Archive",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        groupID: {
          name: "groupID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        access: {
          name: "access",
          isArray: false,
          type: {
            enum: "ArchiveAccess",
          },
          isRequired: true,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        group: {
          name: "group",
          isArray: false,
          type: {
            model: "Group",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "HAS_ONE",
            associatedWith: "id",
          },
        },
        recordings: {
          name: "recordings",
          isArray: true,
          type: {
            model: "Recording",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "archive",
          },
        },
      },
      syncable: true,
      pluralName: "Archives",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "key",
          properties: {
            name: "byGroup",
            fields: ["groupID", "createdAt"],
          },
        },
      ],
    },
    Recording: {
      name: "Recording",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        groupID: {
          name: "groupID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        meta: {
          name: "meta",
          isArray: false,
          type: {
            nonModel: "RecordingMeta",
          },
          isRequired: true,
          attributes: [],
        },
        audio: {
          name: "audio",
          isArray: false,
          type: {
            nonModel: "StoredAudio",
          },
          isRequired: false,
          attributes: [],
        },
        images: {
          name: "images",
          isArray: true,
          type: {
            nonModel: "StoredImage",
          },
          isRequired: true,
          attributes: [],
          isArrayNullable: true,
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        archive: {
          name: "archive",
          isArray: false,
          type: {
            model: "Archive",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "archiveID",
          },
        },
        samples: {
          name: "samples",
          isArray: true,
          type: {
            model: "Sample",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "recording",
          },
        },
      },
      syncable: true,
      pluralName: "Recordings",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "key",
          properties: {
            name: "byGroup",
            fields: ["groupID"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byArchive",
            fields: ["archiveID"],
          },
        },
      ],
    },
    Sample: {
      name: "Sample",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        groupID: {
          name: "groupID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        region: {
          name: "region",
          isArray: false,
          type: {
            nonModel: "SampleRegion",
          },
          isRequired: true,
          attributes: [],
        },
        audio: {
          name: "audio",
          isArray: false,
          type: {
            nonModel: "StoredAudio",
          },
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        recording: {
          name: "recording",
          isArray: false,
          type: {
            model: "Recording",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "recordingID",
          },
        },
        remix: {
          name: "remix",
          isArray: false,
          type: {
            model: "Remix",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "remixID",
          },
        },
      },
      syncable: true,
      pluralName: "Samples",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "key",
          properties: {
            name: "byGroup",
            fields: ["groupID", "updatedAt"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byRecording",
            fields: ["recordingID", "updatedAt"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byRemix",
            fields: ["remixID", "updatedAt"],
          },
        },
      ],
    },
    Remix: {
      name: "Remix",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        groupID: {
          name: "groupID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        meta: {
          name: "meta",
          isArray: false,
          type: {
            nonModel: "RemixMetadata",
          },
          isRequired: true,
          attributes: [],
        },
        images: {
          name: "images",
          isArray: true,
          type: {
            nonModel: "StoredImage",
          },
          isRequired: true,
          attributes: [],
          isArrayNullable: true,
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        tracks: {
          name: "tracks",
          isArray: true,
          type: {
            model: "Track",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "remixID",
          },
        },
        samples: {
          name: "samples",
          isArray: true,
          type: {
            model: "Sample",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "remix",
          },
        },
      },
      syncable: true,
      pluralName: "Remixes",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "key",
          properties: {
            name: "byGroup",
            fields: ["groupID", "createdAt"],
          },
        },
      ],
    },
    Track: {
      name: "Track",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        groupID: {
          name: "groupID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        remixID: {
          name: "remixID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        meta: {
          name: "meta",
          isArray: false,
          type: {
            nonModel: "TrackMetadata",
          },
          isRequired: true,
          attributes: [],
        },
        clips: {
          name: "clips",
          isArray: true,
          type: {
            nonModel: "ClipMetadata",
          },
          isRequired: true,
          attributes: [],
          isArrayNullable: true,
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: "Tracks",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "key",
          properties: {
            name: "byRemix",
            fields: ["remixID"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byGroup",
            fields: ["groupID", "createdAt"],
          },
        },
      ],
    },
  },
  enums: {
    ImageUnits: {
      name: "ImageUnits",
      values: ["px", "percent"],
    },
    ArchiveAccess: {
      name: "ArchiveAccess",
      values: ["private", "public"],
    },
  },
  nonModels: {
    StoredImage: {
      name: "StoredImage",
      fields: {
        key: {
          name: "key",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        type: {
          name: "type",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        role: {
          name: "role",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        thumbnail: {
          name: "thumbnail",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        size: {
          name: "size",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        width: {
          name: "width",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        height: {
          name: "height",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
      },
    },
    ImageCrop: {
      name: "ImageCrop",
      fields: {
        aspect: {
          name: "aspect",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
        x: {
          name: "x",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
        y: {
          name: "y",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
        width: {
          name: "width",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
        height: {
          name: "height",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
        unit: {
          name: "unit",
          isArray: false,
          type: {
            enum: "ImageUnits",
          },
          isRequired: false,
          attributes: [],
        },
      },
    },
    StoredAudio: {
      name: "StoredAudio",
      fields: {
        key: {
          name: "key",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        type: {
          name: "type",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        thumbnail: {
          name: "thumbnail",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        size: {
          name: "size",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        duration: {
          name: "duration",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
      },
    },
    RecordingMeta: {
      name: "RecordingMeta",
      fields: {
        title: {
          name: "title",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        description: {
          name: "description",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
      },
    },
    SampleRegion: {
      name: "SampleRegion",
      fields: {
        offset: {
          name: "offset",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        duration: {
          name: "duration",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
      },
    },
    RemixMetadata: {
      name: "RemixMetadata",
      fields: {
        title: {
          name: "title",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        description: {
          name: "description",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        authors: {
          name: "authors",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        bmp: {
          name: "bmp",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
      },
    },
    TrackMetadata: {
      name: "TrackMetadata",
      fields: {
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        color: {
          name: "color",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        position: {
          name: "position",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        volume: {
          name: "volume",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
      },
    },
    ClipMetadata: {
      name: "ClipMetadata",
      fields: {
        sampleID: {
          name: "sampleID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
      },
    },
  },
  version: "4b1e78f3ae6e2a20c4821afa66128169",
};
