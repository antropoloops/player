import { v4 as uuid } from "uuid";
// import debug from "debug";
import { getDatabase } from "./offline";

//const log = debug("atpls:storage");

const log = (...all: any[]) => undefined; // console.log;

const cache = new Map<string, string>();
const pendingIds: string[] = [];

type StorageGetConfig = {
  download?: boolean;
};

export async function get(
  key: string,
  config?: StorageGetConfig
): Promise<string> {
  log("GET %s", key);
  const cached = cache.get(key);
  if (cached) return cached;

  const db = await getDatabase();
  const object = await db.get("blobs", key);
  if (!object) return "";

  const url = URL.createObjectURL(object.blob);
  cache.set(key, url);
  log("GET (retrieve) %s %s", key, url);
  return url;
}

type StoragePutConfig = {
  projectId: string;
  groupId: string;
};

export async function put(object: Blob, config: StoragePutConfig) {
  const { groupId, projectId } = config;
  const key = `${groupId}/${projectId}/${uuid()}`;
  const db = await getDatabase();
  await db.put("blobs", {
    key,
    blob: object,
    groupID: groupId,
    stats: {
      status: "upload",
      reads: 0,
      updatedAt: new Date(),
    },
  });
  pendingIds.push(key);

  log("PUT %s", key);
  return { key };
}

export async function remove(key: string) {}

export const Storage = {
  get,
  put,
  remove,
};
