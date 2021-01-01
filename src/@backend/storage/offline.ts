import { openDB, DBSchema, IDBPDatabase, deleteDB } from "idb";

type OfflineStorageStatus = "ready" | "upload" | "delete";

export type OfflineObject = {
  key: string;
  groupID?: string;
  blob: Blob;
  stats: {
    status: OfflineStorageStatus;
    reads: number;
    updatedAt: Date;
  };
};

const DB_NAME = "atpls-offline-storage";
export type OfflineStorage = IDBPDatabase<OfflineStorageSchema>;
let db: OfflineStorage | undefined;

interface OfflineStorageSchema extends DBSchema {
  blobs: {
    key: string;
    value: OfflineObject;
  };
}

export async function getDatabase() {
  db = db || (await openDatabase());
  return db;
}

async function openDatabase() {
  return await openDB<OfflineStorageSchema>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore("blobs", {
        keyPath: "key",
      });
    },
  });
}

export async function destroyDatabase() {
  const db = await getDatabase();
  await db.close();
  await deleteDB(DB_NAME);
  return await getDatabase();
}
