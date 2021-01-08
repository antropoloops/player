import { DataStore } from "@aws-amplify/datastore";
import { GetGroup, listProjects } from "../@backend/service";
import { Project, ProjectType, ProjetAccess, Track } from "../models";

export function listGroupRemixes({ groupId }: GetGroup) {
  return listProjects(
    (a) => a.groupID === groupId && a.type === ProjectType.REMIX
  );
}

export async function createRemix(groupId: string, name: string) {
  return await DataStore.save(
    new Project({
      groupID: groupId,
      type: ProjectType.REMIX,
      access: ProjetAccess.GROUP,
      meta: { title: name },
      remix: {
        bpm: 90,
      },
    })
  );
}

export async function updateTrack(track: Track, data: Partial<Track>) {
  return DataStore.save(
    Track.copyOf(track, (draft) => {
      Object.assign(draft, data);
    })
  );
}
