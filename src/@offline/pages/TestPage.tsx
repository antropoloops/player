import {
  DataStore,
  Archive,
  Group,
  changeGroup,
  ArchiveAccess,
  Recording,
  Remix,
} from "../datastore";
import { useEffect, useState } from "react";

type TestPageProps = { className?: string };
async function createScenenario() {
  const group = await DataStore.save(
    new Group({
      name: "Grupo",
    })
  );
  console.log("NEW GROUP", group);
  const archive = await DataStore.save(
    new Archive({
      name: "remixes",
      groupID: group.id,
      access: ArchiveAccess.PRIVATE,
    })
  );
}

async function fetchAll() {
  const [groups, remixes, archives, recording] = await Promise.all([
    DataStore.query(Group),
    DataStore.query(Remix),
    DataStore.query(Archive),
    DataStore.query(Recording),
  ]);
  return { groups, remixes, archives, recording };
}

export function TestPage({ className }: TestPageProps) {
  const [all, setAll] = useState<object>({});
  const [count, inc] = useState(0);

  const refetch = () => inc(count + 1);

  useEffect(() => {
    fetchAll().then((all) => setAll(all));
  }, [count]);

  return (
    <div className="text-white m-16">
      <button
        className="bg-blue-600 rounded p-2 my-4 mr-4"
        onClick={() => {
          createScenenario().then(() => refetch());
        }}
      >
        Create
      </button>
      <button
        className="bg-red-600 rounded p-2 my-4 mr-4"
        onClick={() => {
          changeGroup("").then(() => refetch());
        }}
      >
        Delete
      </button>
      <pre>{JSON.stringify(all, null, 2)}</pre>
    </div>
  );
}
