import { v4 as uuid } from "uuid";
import { getPolygonPoints } from "../lib/svg-wave";
import { blobToBuffer } from "../lib/web-audio";
import { getDatabase, OfflineMediaFile, OfflineData } from "./db";

export async function listAudioFiles() {
  const db = await getDatabase();
  return await db.getAll("mediaFiles");
}

export type OfflineMediaFileAndData = {
  mediaFile: OfflineMediaFile;
  data: OfflineData;
};

export async function getOfflineMediaFile(
  id: string
): Promise<OfflineMediaFileAndData> {
  const db = await getDatabase();
  const mediaFile = await db.get("mediaFiles", id);
  if (!mediaFile) throw Error(`Offline with id '${id}' not found.`);

  const data = await db.get("blobs", mediaFile.storageKey);
  if (!data)
    throw Error(`Offline file id '${mediaFile.storageKey}' not found.`);

  return { mediaFile, data };
}

export async function saveOfflineMediaFiles(files: File[]) {
  const db = await getDatabase();
  const result: OfflineMediaFileAndData[] = [];

  for (const file of files) {
    const data: OfflineData = {
      key: uuid(),
      blob: file,
    };
    const mediaFile: OfflineMediaFile = {
      id: uuid(),
      name: file.name,
      size: file.size,
      mimeType: file.type,
      storageKey: data.key,
      createdAt: new Date(),
    };
    await db.put("blobs", data);
    await db.put("mediaFiles", mediaFile);
    result.push({ mediaFile, data });
  }
  return result;
}

export async function createMediaFile(
  blob: Blob,
  {
    name,
    mimeType,
    parentId,
  }: Pick<OfflineMediaFile, "name" | "mimeType" | "parentId">
) {
  const db = await getDatabase();
  const data: OfflineData = {
    key: uuid(),
    blob: blob,
  };
  const mediaFile: OfflineMediaFile = {
    id: uuid(),
    name,
    mimeType,
    parentId,
    size: blob.size,
    storageKey: data.key,
    createdAt: new Date(),
  };
  await db.put("blobs", data);
  await db.put("mediaFiles", mediaFile);
  return { mediaFile, data };
}

export async function createAudioThumbnail(
  input: OfflineMediaFileAndData,
  ctx: AudioContext
) {
  const { data, mediaFile } = input;
  const buffer = await blobToBuffer(ctx, data.blob);
  const points = getPolygonPoints(buffer, 1000, 100);
  mediaFile.thumbnail = points;
  const db = await getDatabase();
  db.put("mediaFiles", mediaFile);
}
