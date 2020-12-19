import { DataStore, syncExpression } from "@aws-amplify/datastore";
import { Track } from "../../models";
import { Project, Media, Selection } from "../../models";

export { DataStore, Predicates } from "@aws-amplify/datastore";

let _groupId = "none";

DataStore.configure({
  syncExpressions: [
    syncExpression(Project, () => {
      return (c) => c.groupID("eq", _groupId);
    }),
    syncExpression(Media, () => {
      return (c) => c.groupID("eq", _groupId);
    }),
    syncExpression(Track, () => {
      return (c) => c.groupID("eq", _groupId);
    }),
    syncExpression(Selection, () => {
      return (c) => c.groupID("eq", _groupId);
    }),
  ],
});

export async function changeGroup(groupId: string) {
  _groupId = groupId;
  try {
    await DataStore.stop();
    await DataStore.clear();
    await DataStore.start();
  } catch (error) {
    console.log("Error", error);
  }
}
