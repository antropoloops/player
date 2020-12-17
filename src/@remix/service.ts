import { DataStore } from "@aws-amplify/datastore";
import { GetGroup, listProjects } from "../@offline/service";
import { Project, ProjectType, ProjetAccess } from "../models";

export function listGroupRemixes({ groupId }: GetGroup) {
  return listProjects(
    (a) => a.groupID === groupId && a.type === ProjectType.REMIX
  );
}

export async function createRemix(groupId: string, name: string) {
  return await DataStore.save(
    new Project({
      groupID: groupId,
      name: name,
      type: ProjectType.REMIX,
      access: ProjetAccess.GROUP,
      meta: { title: name },
      remix: {},
    })
  );
}