import {
  OfflineSoundData,
  OfflineFile,
  getDatabase,
  OfflineSound,
} from "./offlineDb";
import { v4 as uuid } from "uuid";
import { getPolygonPoints } from "../lib/svg-wave";
import { blobToBuffer } from "../lib/web-audio";
import debug from "debug";

const log = debug("atpls:sound:service");

export async function listSounds() {
  const db = await getDatabase();
  return db.getAll("sounds");
}
export async function getOfflineSound(id: string): Promise<OfflineSound> {
  const db = await getDatabase();

  const data = await db.get("sounds", id);
  if (!data) throw Error("sound not found " + id);

  const file = await db.get("files", data.storageKey);
  if (!file) throw Error("file not found " + data.storageKey);

  return { data, file };
}

export async function createOfflineSound(fileName: string, blob: Blob) {
  log("create file %s", fileName);
  const db = await getDatabase();
  const file: OfflineFile = {
    key: uuid(),
    blob: blob,
  };
  await db.put("files", file);
  const data: OfflineSoundData = {
    id: uuid(),
    storage: "offline",
    fileName: fileName,
    mimeType: blob.type,
    fileSize: blob.size,
    audio: {},
    tags: [],
    storageKey: file.key,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {},
  };
  await db.put("sounds", data);
  const sound: OfflineSound = { data, file };
  return sound;
}

export async function addAudioInformation(sound: OfflineSound) {
  const { data, file } = sound;
  const buffer = await blobToBuffer(file.blob);
  const points = getPolygonPoints(buffer, 100, 10);
  data.audio = {
    length: buffer.length,
    duration: buffer.duration,
    numberOfChannels: buffer.numberOfChannels,
    sampleRate: buffer.sampleRate,
    thumbnail: points,
  };
  const db = await getDatabase();
  db.put("sounds", data);
}
