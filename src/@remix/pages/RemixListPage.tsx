import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useListRemixesQuery } from "../hooks/useRemixQueries";
import { createRemix } from "../service";
import { AddIcon, CloudDownloadIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import routes from "../../routes";
import { IconButtonBig } from "../components/shared/Buttons";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import { Separator } from "../../@core/components/Separator";
import { useObserveList } from "../../@backend/hooks/useObserveModel";
import { Project, ProjectType } from "../../models";

type Props = {};
const RemixListPage: React.FC<Props> = () => {
  const history = useHistory();
  const group = useCurrentGroup();
  const { data: remixes } = useObserveList(Project, (c) =>
    c.type("eq", ProjectType.REMIX)
  );

  const length = remixes.length || 0;

  return (
    <Layout nav="projects">
      <img src="/images/sections/community.jpg" alt="Remix" />
      <Separator className="bg-remixes">{group?.name}:remezclas</Separator>
      <div className="flex">
        <IconButtonBig
          icon={AddIcon}
          color="text-remixes"
          onClick={() => {
            if (group) {
              createRemix(group.id, "Remezcla-" + (length + 1)).then(
                (remix) => {
                  history.push(routes.remix(remix.id));
                }
              );
            }
          }}
        >
          Crear remezcla
        </IconButtonBig>
        {/* <IconButtonBig
          icon={CloudDownloadIcon}
          onClick={() => {
            const url =
              "https://play-admin.antropoloops.com/api/1.0/index/cartuja";
            importOfflineRemix(url).then((id) => {
              if (id) history.push(routes.remixEdit(id));
            });
          }}
        >
          Importar proyecto
        </IconButtonBig> */}
      </div>
      <div>
        {remixes &&
          remixes.map((remix) => (
            <Link
              key={remix.id}
              className="w-full mb-1 p-2 flex bg-gray-light text-white"
              to={routes.remix(remix.id)}
            >
              {remix.meta.title || "Sin título"}
            </Link>
          ))}
      </div>
    </Layout>
  );
};
export default RemixListPage;
