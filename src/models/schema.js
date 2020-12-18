export const schema = {
    "models": {
        "Group": {
            "name": "Group",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "meta": {
                    "name": "meta",
                    "isArray": false,
                    "type": {
                        "nonModel": "Metadata"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Groups",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "Project": {
            "name": "Project",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "groupID": {
                    "name": "groupID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "ProjectType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "access": {
                    "name": "access",
                    "isArray": false,
                    "type": {
                        "enum": "ProjetAccess"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "meta": {
                    "name": "meta",
                    "isArray": false,
                    "type": {
                        "nonModel": "Metadata"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "remix": {
                    "name": "remix",
                    "isArray": false,
                    "type": {
                        "nonModel": "RemixMetadata"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "group": {
                    "name": "group",
                    "isArray": false,
                    "type": {
                        "model": "Group"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id"
                    }
                },
                "recordings": {
                    "name": "recordings",
                    "isArray": true,
                    "type": {
                        "model": "Media"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "projectID"
                    }
                },
                "selections": {
                    "name": "selections",
                    "isArray": true,
                    "type": {
                        "model": "Selection"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "projectID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Projects",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byGroup",
                        "fields": [
                            "groupID",
                            "createdAt"
                        ]
                    }
                }
            ]
        },
        "Media": {
            "name": "Media",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "projectID": {
                    "name": "projectID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "groupID": {
                    "name": "groupID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "MediaType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "meta": {
                    "name": "meta",
                    "isArray": false,
                    "type": {
                        "nonModel": "Metadata"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "file": {
                    "name": "file",
                    "isArray": false,
                    "type": {
                        "nonModel": "StoredFile"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "selections": {
                    "name": "selections",
                    "isArray": true,
                    "type": {
                        "model": "Selection"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "media"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Media",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byGroup",
                        "fields": [
                            "groupID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byProject",
                        "fields": [
                            "projectID"
                        ]
                    }
                }
            ]
        },
        "Selection": {
            "name": "Selection",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "groupID": {
                    "name": "groupID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "projectID": {
                    "name": "projectID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "role": {
                    "name": "role",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "MediaType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "audio": {
                    "name": "audio",
                    "isArray": false,
                    "type": {
                        "nonModel": "AudioRegion"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": {
                        "nonModel": "ImageCrop"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "file": {
                    "name": "file",
                    "isArray": false,
                    "type": {
                        "nonModel": "StoredFile"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "media": {
                    "name": "media",
                    "isArray": false,
                    "type": {
                        "model": "Media"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "mediaID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Selections",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byGroup",
                        "fields": [
                            "groupID",
                            "updatedAt"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byMedia",
                        "fields": [
                            "mediaID",
                            "updatedAt"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byProject",
                        "fields": [
                            "projectID",
                            "updatedAt"
                        ]
                    }
                }
            ]
        },
        "Track": {
            "name": "Track",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "groupID": {
                    "name": "groupID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "projectID": {
                    "name": "projectID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "meta": {
                    "name": "meta",
                    "isArray": false,
                    "type": {
                        "nonModel": "TrackMetadata"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "clips": {
                    "name": "clips",
                    "isArray": true,
                    "type": {
                        "nonModel": "ClipMetadata"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Tracks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byProject",
                        "fields": [
                            "projectID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byGroup",
                        "fields": [
                            "groupID",
                            "createdAt"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "ProjectType": {
            "name": "ProjectType",
            "values": [
                "archive",
                "remix"
            ]
        },
        "ProjetAccess": {
            "name": "ProjetAccess",
            "values": [
                "group"
            ]
        },
        "MediaType": {
            "name": "MediaType",
            "values": [
                "recording",
                "image"
            ]
        },
        "ImageUnits": {
            "name": "ImageUnits",
            "values": [
                "px",
                "percent"
            ]
        }
    },
    "nonModels": {
        "Metadata": {
            "name": "Metadata",
            "fields": {
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "authors": {
                    "name": "authors",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "credits": {
                    "name": "credits",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "licenses": {
                    "name": "licenses",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "readme": {
                    "name": "readme",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "RemixMetadata": {
            "name": "RemixMetadata",
            "fields": {
                "bmp": {
                    "name": "bmp",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "StoredFile": {
            "name": "StoredFile",
            "fields": {
                "key": {
                    "name": "key",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "mimeType": {
                    "name": "mimeType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "fileName": {
                    "name": "fileName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "fileSize": {
                    "name": "fileSize",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "thumbnail": {
                    "name": "thumbnail",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "duration": {
                    "name": "duration",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "width": {
                    "name": "width",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "height": {
                    "name": "height",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "AudioRegion": {
            "name": "AudioRegion",
            "fields": {
                "offset": {
                    "name": "offset",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "duration": {
                    "name": "duration",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "ImageCrop": {
            "name": "ImageCrop",
            "fields": {
                "aspect": {
                    "name": "aspect",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "x": {
                    "name": "x",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "y": {
                    "name": "y",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "width": {
                    "name": "width",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "height": {
                    "name": "height",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "unit": {
                    "name": "unit",
                    "isArray": false,
                    "type": {
                        "enum": "ImageUnits"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "TrackMetadata": {
            "name": "TrackMetadata",
            "fields": {
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "color": {
                    "name": "color",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "position": {
                    "name": "position",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "volume": {
                    "name": "volume",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "ClipMetadata": {
            "name": "ClipMetadata",
            "fields": {
                "selectionID": {
                    "name": "selectionID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "653cefe378ae821262512fc3c543fbf9"
};