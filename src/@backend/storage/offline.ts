import { openDB, DBSchema, IDBPDatabase, deleteDB } from "idb";

type SyncStatus = "upload" | "delete";

export type OfflineSyncTask = {
  key: string;
  status: SyncStatus;
  time: number;
  running?: boolean;
};

export type OfflineObject = {
  key: string;
  groupID?: string;
  blob: Blob;
};

const DB_NAME = "atpls-offline-storage";
export type OfflineStorage = IDBPDatabase<OfflineStorageSchema>;
let db: OfflineStorage | undefined;

interface OfflineStorageSchema extends DBSchema {
  blobs: {
    key: string;
    value: OfflineObject;
  };
  sync: {
    key: string;
    value: OfflineSyncTask;
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
      const sync = db.createObjectStore("sync", {
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
