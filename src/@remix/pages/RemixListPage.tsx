import React from "react";
import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import routes from "../../routes";
import AddItemButton from "../components/shared/Buttons";
import { createOfflineRemix, loadOfflineRemixes } from "../offline";

type Props = {};
const RemixListPage: React.FC<Props> = () => {
  const history = useHistory();
  const { data: remixes } = useQuery(["offline-remixes"], () =>
    loadOfflineRemixes()
  );
  return (
    <Layout>
      <img src="/images/sections/community.jpg" alt="Remix" />
      <h2 className="p-1 mb-1 bg-pink-600 text-bg-dark">Remixes</h2>
      <AddItemButton
        onClick={() => {
          createOfflineRemix().then((id) => {
            history.push(routes.remixEdit(id));
          });
        }}
      >
        Crear proyecto
      </AddItemButton>
      <div>
        {remixes &&
          remixes.map((remix) => (
            <Link
              key={remix.id}
              className="w-full mb-1 p-2 flex bg-gray-light text-white"
              to={routes.remixEdit(remix.id)}
            >
              {remix.audioset.meta.title}
            </Link>
          ))}
      </div>
    </Layout>
  );
};
export default RemixListPage;
