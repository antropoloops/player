/* eslint-disable no-console */
import { openDB, DBSchema, IDBPDatabase, deleteDB } from "idb";

const DB_NAME = "atpls-offline-sounds";
let db: OfflineDB | undefined;

export type SoundMetadata = {
  title?: string;
  album?: string;
  year?: string;
  artist?: string;
  location?: string;
  lng?: number;
  lat?: number;
  country?: string;
};

export type AudioMetadata = {
  length?: number;
  duration?: number;
  numberOfChannels?: number;
  sampleRate?: number;
  thumbnail?: string;
};

export type OfflineSoundData = {
  id: string;
  storage: "offline";
  fileName: string;
  mimeType: string;
  fileSize: number;
  audio: AudioMetadata;
  storageKey: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  metadata: SoundMetadata;
};

export type OfflineFile = {
  key: string;
  blob: Blob;
};

export type OfflineSound = {
  data: OfflineSoundData;
  file: OfflineFile;
};

interface OfflineFilebaseSchema extends DBSchema {
  sounds: {
    key: string;
    value: OfflineSoundData;
  };
  files: {
    key: string;
    value: OfflineFile;
  };
}

export type OfflineDB = IDBPDatabase<OfflineFilebaseSchema>;

export async function getDatabase() {
  db = db || (await openSoundsDatabase());
  return db;
}

async function openSoundsDatabase() {
  console.log("OPEN", DB_NAME);
  db = await openDB<OfflineFilebaseSchema>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore("sounds", {
        keyPath: "id",
      });
      db.createObjectStore("files", {
        keyPath: "key",
      });
    },
  });

  return db;
}

export async function destroyDatabase() {
  const db = await getDatabase();
  await db.close();
  await deleteDB(DB_NAME);
  return await getDatabase();
}
