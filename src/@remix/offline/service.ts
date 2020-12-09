import { v4 as uuid } from "uuid";
import { Audioset, EmptyAudioset, isAudioset } from "../../audioset";
import { getDatabase, OfflineRemix, OfflineRemixStorage } from "./db";
import API from "../../api";
import { getActiveAudioContext } from "../../lib/active-audio-context";
import { createAudioThumbnail, createMediaFile } from "../../@archive/offline";

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
  const id = uuid();
  const remix = await db.put("remixes", {
    id,
    audioset: { ...EmptyAudioset, id },
  });
  return remix;
}

async function getAudioContext() {
  const ctx = await getActiveAudioContext();
  return (ctx as unknown) as AudioContext;
}

export async function importOfflineRemix(url: string) {
  const bundle = await API.bundles.get({ path: "cartuja" });
  if (!isAudioset(bundle)) return "";
  const audiosetKey = uuid();
  const ctx = await getAudioContext();

  const audioset: Audioset = bundle;
  for (const clip of audioset.clips) {
    const audio = clip.resources.audio;
    const audioUrl = audio.wav || audio.ogg || audio.mp3 || "";
    const fileName = audioUrl
      .slice(audioUrl.lastIndexOf("/") + 1)
      .toLowerCase();
    const response = await fetch(audioUrl);
    const mimeType = response.headers.get("Content-Type") || "";
    const blob = await response.blob();
    const file = await createMediaFile(blob, {
      name: fileName,
      mimeType,
      parentId: audiosetKey,
    });
    await createAudioThumbnail(file, ctx);
    audio.storage = {
      fileName,
      mimeType,
      duration: file.mediaFile.duration || 0,
      offlineId: file.mediaFile.id,
      offlineKey: file.data.key,
      waveform: file.mediaFile.thumbnail || "",
      region: {
        offset: 0,
        duration: 0,
      },
    };
  }

  const db = await getDatabase();
  const remix = await db.put("remixes", {
    id: audiosetKey,
    audioset: { ...audioset },
  });
  return remix;
}
