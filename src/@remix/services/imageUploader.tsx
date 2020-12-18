import { v4 as uuid } from "uuid";
import { Storage } from "@aws-amplify/storage";
import { DataStore } from "@aws-amplify/datastore";
import {
  Group,
  Media,
  Project,
  Selection,
  MediaType,
} from "../../@backend/datastore";
import { blobToBuffer } from "../../@sounds/lib/web-audio";
import { getPolygonPoints } from "../../@sounds/lib/svg-wave";

export function imageUploader(project: Project, group: Group) {
  const uploadFile = async (file: File) => {
    const result: any = await Storage.put(
      `${group.id}/${project.id}/${uuid()}`,
      file
    );
    const media = await DataStore.save(
      new Media({
        groupID: group.id,
        projectID: project.id,
        type: MediaType.RECORDING,
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
    await addAudioMetadata(media, file);
    const selection = await DataStore.save(
      new Selection({
        groupID: group.id,
        projectID: project.id,
        media: media,
        type: MediaType.RECORDING,
      })
    );
    return selection;
  };

  return uploadFile;
}

export async function addAudioMetadata(media: Media, file: File) {
  const buffer = await blobToBuffer(file);
  const points = getPolygonPoints(buffer, 100, 10);
  console.log("AUDIO METADATA!!", buffer.duration);
  await DataStore.save(
    Media.copyOf(media, (draft) => {
      draft.file.duration = buffer.duration;
      draft.file.thumbnail = points;
    })
  );
}
