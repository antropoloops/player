import { v4 as uuid } from "uuid";
import { EmptyAudioset } from "../../audioset";
import { getDatabase, OfflineRemix, OfflineRemixStorage } from "./db";

export async function saveStorage(storage: OfflineRemixStorage) {
  const db = await getDatabase();
  return await db.put("storage", storage);
}

export async function loadStorage(id: string) {
  const db = await getDatabase();
  return await db.get("storage", id);
}
export async function deleteStorage(id: string) {
  const db = await getDatabase();
  return await db.delete("storage", id);
}

export async function loadOfflineRemixes() {
  const db = await getDatabase();
  return await db.getAll("remixes");
}

export async function getOfflineRemix(id: string) {
  const db = await getDatabase();
  return await db.get("remixes", id);
}

export async function saveRemix(remix: OfflineRemix) {
  const db = await getDatabase();
  return await db.put("remixes", remix);
}

export async function createOfflineRemix() {
  const db = await getDatabase();
  const audioset = EmptyAudioset;
  audioset.meta = { ...audioset.meta, title: "Sin título" };
  const id = uuid();
  const remix = await db.put("remixes", {
    id,
    audioset: { ...EmptyAudioset, id },
  });
  return remix;
}
