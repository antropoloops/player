import { DataStore } from "@aws-amplify/datastore";
import { GetGroup, GetGroupProject, listProjects } from "../@offline/service";
import { Media, Project } from "../models";

export function listGroupArchives({ groupId }: GetGroup) {
  return listProjects((a) => a.groupID === groupId);
}

export function getGroupArchive({ groupId, projectId }: GetGroupProject) {
  return listProjects((a) => a.id === projectId && a.groupID === groupId);
}

export function listArchiveRecordings({ groupId, projectId }: GetGroupProject) {
  return listRecordings(
    (r) => r.project?.id === projectId && r.groupID === groupId
  );
}

// BASE

async function listRecordings(filter?: (r: Media) => boolean) {
  const recordings = await DataStore.query(Media);
  return filter ? recordings.filter(filter) : recordings;
}
