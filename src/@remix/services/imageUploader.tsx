import { v4 as uuid } from "uuid";
import { Storage } from "@aws-amplify/storage";
import { DataStore } from "@aws-amplify/datastore";
import {
  Group,
  Media,
  Project,
  Selection,
  MediaType,
  Track,
} from "../../@backend/datastore";

export function imageUploader(
  group: Group,
  project: Project,
  track: Track | undefined,
  sampleId?: string
) {
  const uploadFile = async (file: File) => {
    const result: any = await Storage.put(
      `${group.id}/${project.id}/${uuid()}`,
      file
    );
    const media = await DataStore.save(
      new Media({
        type: MediaType.IMAGE,
        groupID: group.id,
        projectID: project.id,
        meta: {
          title: file.name,
        },
        file: {
          key: result.key,
          mimeType: file.type,
          fileName: file.name,
          fileSize: file.size,
        },
      })
    );
    const selection = await DataStore.save(
      new Selection({
        type: MediaType.IMAGE,
        groupID: group.id,
        projectID: project.id,
        media: media,
        trackID: track?.id,
        sampleID: sampleId,
      })
    );
    return selection;
  };

  return uploadFile;
}
