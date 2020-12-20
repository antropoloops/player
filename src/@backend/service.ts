import { DataStore } from "./datastore";
import { Selection, Track, TrackMetadata, Project, Group } from "./datastore";

export type GetGroup = {
  groupId: string;
};

export type GetGroupProject = {
  groupId: string;
  projectId: string;
};

export async function filterBy<T>(
  source: Promise<T[]>,
  filter: (x: T) => boolean
) {
  const data = await source;
  return data.filter(filter);
}

export async function listProjects(filter?: (x: Project) => boolean) {
  const archives = await DataStore.query(Project);
  return filter ? archives.filter(filter) : archives;
}

export async function listTracks(filter?: (t: Track) => boolean) {
  const tracks = await DataStore.query(Track);
  return filter ? tracks.filter(filter) : tracks;
}
export async function listProjectTracks(projectId: string) {
  return listTracks((t) => t.projectID === projectId);
}

export async function createTrack(
  project: Pick<Project, "id" | "groupID">,
  meta?: TrackMetadata
) {
  return await DataStore.save(
    new Track({
      groupID: project.groupID,
      projectID: project.id,
      meta: meta || {},
    })
  );
}

export async function listProjectSamples(groupId: string, projectId: string) {
  const selections = await DataStore.query(Selection);
  return selections.filter(
    (s) => s.projectID === projectId && s.groupID === groupId
  );
}

export async function listGroups() {
  return DataStore.query(Group);
}

export async function updateGroup(group: Group, data: Partial<Group>) {
  return DataStore.save(
    Group.copyOf(group, (draft) => {
      Object.assign(draft, data);
    })
  );
}
