import { Storage } from "../../@backend/storage";
import { DataStore } from "@aws-amplify/datastore";
import { Group, Media, Project, MediaType } from "../../@backend/datastore";
import { blobToBuffer } from "../../@sounds/lib/web-audio";
import { getPolygonPoints } from "../../@sounds/lib/svg-wave";

export function audioUploader(
  ctx: AudioContext,
  group: Group,
  project: Project
) {
  const uploadFile = async (file: File) => {
    const { key } = await Storage.put(file, {
      groupId: group.id,
      projectId: project.id,
    });
    const buffer = await blobToBuffer(ctx, file);
    const points = getPolygonPoints(buffer, 100, 10);
    const duration = buffer.duration;
    const audio = await DataStore.save(
      new Media({
        groupID: group.id,
        projectID: project.id,
        type: MediaType.RECORDING,
        meta: {
          title: file.name,
        },
        file: {
          key,
          mimeType: file.type,
          fileName: file.name,
          fileSize: file.size,
          duration: duration,
          thumbnail: points,
        },
      })
    );
    return audio;
  };

  return uploadFile;
}

export async function addAudioMetadata(
  ctx: AudioContext,
  media: Media,
  file: File
) {
  const buffer = await blobToBuffer(ctx, file);
  const points = getPolygonPoints(buffer, 100, 10);
  await DataStore.save(
    Media.copyOf(media, (draft) => {
      draft.file.duration = buffer.duration;
      draft.file.thumbnail = points;
    })
  );
}
