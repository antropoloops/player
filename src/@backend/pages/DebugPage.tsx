import preval from "preval.macro";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import routes from "../../routes";
import {
  DataStore,
  Project,
  Group,
  changeGroup,
  Media,
  ProjetAccess,
  ProjectType,
} from "../datastore";
import { useCurrentGroup } from "../hooks/useCurrentGroup";
import { useCurrentUser } from "../hooks/useCurrentUser";

async function fetchAll() {
  const [groups, projects, media] = await Promise.all([
    DataStore.query(Group),
    DataStore.query(Project),
    DataStore.query(Media),
  ]);
  return { projects, groups, media };
}

type TestPageProps = { className?: string };

export function TestPage({ className }: TestPageProps) {
  const [all, setAll] = useState<object>({});
  const [count, inc] = useState(0);

  const group = useCurrentGroup();
  const user = useCurrentUser();

  const refetch = () => inc(count + 1);

  useEffect(() => {
    fetchAll().then((all) => setAll(all));
  }, [count]);

  return (
    <Layout
      nav="projects"
      desktop={
        <div className="text-white m-4">
          <div className="my-4">
            Build Date: {preval`module.exports = new Date().toLocaleString();`}.
          </div>
          <pre className="text-xs">{JSON.stringify(all, null, 2)}</pre>
        </div>
      }
    >
      <div className="flex flex-col p-4 text-white">
        <label>Group: {group?.name}</label>
        <label>User: {user?.email}</label>
        <Link className="underline" to={routes.adminLogin()}>
          login
        </Link>

        <div className="py-4">
          <button
            className="bg-red-600 rounded p-2 my-4 mr-4"
            onClick={() => {
              changeGroup("").then(() => refetch());
            }}
          >
            Borrar datos locales!
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default TestPage;
