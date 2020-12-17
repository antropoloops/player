import { DataStore } from "@aws-amplify/datastore";
import { Group } from "../../models";

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
