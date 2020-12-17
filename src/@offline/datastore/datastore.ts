import { DataStore, syncExpression } from "@aws-amplify/datastore";
import { Archive, Recording, Remix, Sample } from "./models";

export { DataStore, Predicates } from "@aws-amplify/datastore";

let _groupId = "none";

DataStore.configure({
  syncExpressions: [
    syncExpression(Archive, () => {
      return (c) => c.groupID("eq", _groupId);
    }),
    syncExpression(Recording, () => {
      return (c) => c.groupID("eq", _groupId);
    }),
    syncExpression(Remix, () => {
      return (c) => c.groupID("eq", _groupId);
    }),
    syncExpression(Sample, () => {
      return (c) => c.groupID("eq", _groupId);
    }),
  ],
});

export async function changeGroup(groupId: string) {
  _groupId = groupId;
  await DataStore.stop();
  await DataStore.clear();
  await DataStore.start();
}
