import { openDB, DBSchema, IDBPDatabase } from "idb";
import { Audioset } from "../../audioset";

const DB_NAME = "atpls-remix";
let db: OfflineRemixDB | undefined;

export type OfflineRemix = {
  id: string;
  audioset: Audioset;
};

export type OfflineRemixStorage = {
  id: string;
  parentKey: string;
  blob: Blob;
};

interface RemixDatabaseSchema extends DBSchema {
  remixes: {
    key: string;
    value: OfflineRemix;
  };
  storage: {
    key: string;
    value: OfflineRemixStorage;
  };
}

export type OfflineRemixDB = IDBPDatabase<RemixDatabaseSchema>;

export async function getDatabase() {
  db = db || (await openOfflineDatabase());
  return db;
}

async function openOfflineDatabase() {
  db = await openDB<RemixDatabaseSchema>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore("remixes", {
        keyPath: "id",
      });
      db.createObjectStore("storage", {
        keyPath: "id",
      });
    },
  });

  return db;
}
