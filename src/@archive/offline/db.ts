import { openDB, DBSchema, IDBPDatabase } from "idb";

const DB_NAME = "atpls-archive";
let db: OfflineDB | undefined;

export type OfflineMediaFile = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  parentId?: string;
  storageKey: string;
  thumbnail?: string;
  createdAt: Date;
};

export type OfflineData = {
  key: string;
  blob: Blob;
};

interface OfflineDatabaseSchema extends DBSchema {
  mediaFiles: {
    key: string;
    value: OfflineMediaFile;
  };
  blobs: {
    key: string;
    value: OfflineData;
  };
}

export type OfflineDB = IDBPDatabase<OfflineDatabaseSchema>;

export async function getDatabase() {
  db = db || (await openOfflineDatabase());
  return db;
}

async function openOfflineDatabase() {
  db = await openDB<OfflineDatabaseSchema>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore("mediaFiles", {
        keyPath: "id",
      });
      db.createObjectStore("blobs", {
        keyPath: "key",
      });
    },
  });

  return db;
}
