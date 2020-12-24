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
        },
        "Clip": {
            "name": "Clip",
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
                "trackID": {
                    "name": "trackID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "meta": {
                    "name": "meta",
                    "isArray": false,
                    "type": {
                        "nonModel": "ClipMetadata"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "audio": {
                    "name": "audio",
                    "isArray": false,
                    "type": {
                        "nonModel": "EditableAudio"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": {
                        "nonModel": "EditableImage"
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
                }
            },
            "syncable": true,
            "pluralName": "Clips",
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
                        "name": "byProject",
                        "fields": [
                            "projectID",
                            "updatedAt"
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
                    "type": "Float",
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
        "AudioRegion": {
            "name": "AudioRegion",
            "fields": {
                "offset": {
                    "name": "offset",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "duration": {
                    "name": "duration",
                    "isArray": false,
                    "type": "Float",
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
                }
            }
        },
        "ClipMetadata": {
            "name": "ClipMetadata",
            "fields": {
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "keyboardKey": {
                    "name": "keyboardKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "MediaResource": {
            "name": "MediaResource",
            "fields": {
                "mediaID": {
                    "name": "mediaID",
                    "isArray": false,
                    "type": "ID",
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
                }
            }
        },
        "EditedAudio": {
            "name": "EditedAudio",
            "fields": {
                "region": {
                    "name": "region",
                    "isArray": false,
                    "type": {
                        "nonModel": "AudioRegion"
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
                }
            }
        },
        "EditedImage": {
            "name": "EditedImage",
            "fields": {
                "crop": {
                    "name": "crop",
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
                }
            }
        },
        "EditableAudio": {
            "name": "EditableAudio",
            "fields": {
                "original": {
                    "name": "original",
                    "isArray": false,
                    "type": {
                        "nonModel": "MediaResource"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "current": {
                    "name": "current",
                    "isArray": false,
                    "type": {
                        "nonModel": "EditedAudio"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "EditableImage": {
            "name": "EditableImage",
            "fields": {
                "original": {
                    "name": "original",
                    "isArray": false,
                    "type": {
                        "nonModel": "MediaResource"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "current": {
                    "name": "current",
                    "isArray": false,
                    "type": {
                        "nonModel": "EditedImage"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "818b4ae8c3e79f7ae85e13b46bbf946b"
};