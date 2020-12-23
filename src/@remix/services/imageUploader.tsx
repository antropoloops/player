import { v4 as uuid } from "uuid";
import { Storage } from "@aws-amplify/storage";
import { DataStore } from "@aws-amplify/datastore";
import { Group, Media, Project, MediaType } from "../../@backend/datastore";

export function imageUploader(group: Group, project: Project) {
  const uploadFile = async (file: File) => {
    const result: any = await Storage.put(
      `${group.id}/${project.id}/${uuid()}`,
      file
    );
    const image = await DataStore.save(
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
    return image;
  };

  return uploadFile;
}
