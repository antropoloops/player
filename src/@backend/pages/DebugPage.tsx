import preval from "preval.macro";
import { useEffect, useState } from "react";
import {
  DataStore,
  Project,
  Group,
  changeGroup,
  Media,
  ProjetAccess,
  ProjectType,
} from "../datastore";

type TestPageProps = { className?: string };
async function createScenenario() {
  const group = await DataStore.save(
    new Group({
      name: "Grupo",
      meta: {},
    })
  );
  await DataStore.save(
    new Project({
      name: "Archivo",
      groupID: group.id,
      type: ProjectType.ARCHIVE,
      access: ProjetAccess.GROUP,
      meta: {
        title: "Archivo compartido",
      },
      remix: {},
    })
  );
}

async function fetchAll() {
  const [groups, archives, media] = await Promise.all([
    DataStore.query(Group),
    DataStore.query(Project),
    DataStore.query(Media),
  ]);
  return { groups, archives, media };
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
      <div className="my-4">
        Build Date: {preval`module.exports = new Date().toLocaleString();`}.
      </div>
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

export default TestPage;
