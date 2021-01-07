import { Storage as AwsStorage } from "@aws-amplify/storage";
import { v4 as uuid } from "uuid";
// import debug from "debug";
import { getDatabase, OfflineStorage } from "./offline";

//const log = debug("atpls:storage");

const log = console.log; // (...all: any[]) => undefined; // console.log;

const cache = new Map<string, string>();

type StorageGetConfig = {
  download?: boolean;
};

export async function get(
  key: string,
  config?: StorageGetConfig
): Promise<string> {
  const shortKey = key.slice(key.lastIndexOf("-") + 1);
  log("GET %s", shortKey);

  // get from local cache (fastest)
  const cached = cache.get(key);
  if (cached) return cached;

  // get from idb (fast)
  const db = await getDatabase();
  const object = await db.get("blobs", key);
  if (object) {
    const url = URL.createObjectURL(object.blob);
    cache.set(key, url);
    log("GET - %s - URL: %s", shortKey, url);
    return url;
  }

  // get from aws (slow)
  const awsUrl = await AwsStorage.get(key, {
    download: false,
  });
  if (typeof awsUrl === "string") {
    const response = await fetch(awsUrl);
    if (response.status === 200) {
      const blob = await response.blob();
      await db.put("blobs", { key, blob });
      return get(key);
    }
  }

  log("GET: Object not found %s", shortKey);
  return "";
}

type StoragePutConfig = {
  projectId: string;
  groupId: string;
};

export async function put(object: Blob, config: StoragePutConfig) {
  const { groupId, projectId } = config;
  const key = `${groupId}/${projectId}/${uuid()}`;
  const db = await getDatabase();
  log("PUT %s", key);
  await db.put("blobs", {
    key,
    blob: object,
    groupID: groupId,
  });
  await db.put("sync", {
    key,
    time: Date.now(),
    status: "upload",
  });

  synchronize();
  return { key };
}

export async function synchronize(retries = 5) {
  if (!retries) return;

  try {
    const db = await getDatabase();
    const tasks = await (await db.getAll("sync")).sort(
      (a, b) => b.time - a.time
    );
    log("Sync tasks %d", tasks.length);
    const task = tasks[0];
    if (!task) return;

    if (task.status === "upload") {
      await uploadToAws(db, task.key);
      synchronize(retries);
    }
  } catch (err) {
    log("SYNC ERROR %o", err);
    synchronize(retries - 1);
  }
}

async function uploadToAws(db: OfflineStorage, key: string) {
  log("Uploading... %s", key);
  const offline = await db.get("blobs", key);
  if (!offline) return false;

  await AwsStorage.put(key, offline.blob, {});
  await db.delete("sync", key);
  log("Uploaded %s", key);
  return true;
}

export async function remove(key: string) {}

export const Storage = {
  get,
  put,
  remove,
};
