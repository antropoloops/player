import { DataStore } from "@aws-amplify/datastore";
import { Archive, Recording } from "../models";

export type GetGroup = {
  groupId: string;
};

export type GetGroupArchive = {
  groupId: string;
  archiveId: string;
};

export function listGroupArchives({ groupId }: GetGroup) {
  return listArchives((a) => a.groupID === groupId);
}

export function getGroupArchive({ groupId, archiveId }: GetGroupArchive) {
  return listArchives((a) => a.id === archiveId && a.groupID === groupId);
}

export function listArchiveRecordings({ groupId, archiveId }: GetGroupArchive) {
  return listRecordings(
    (r) => r.archive?.id === archiveId && r.groupID === groupId
  );
}

// BASE

async function listArchives(filter?: (a: Archive) => boolean) {
  const archives = await DataStore.query(Archive);
  return filter ? archives.filter(filter) : archives;
}
async function listRecordings(filter?: (r: Recording) => boolean) {
  const recordings = await DataStore.query(Recording);
  return filter ? recordings.filter(filter) : recordings;
}
