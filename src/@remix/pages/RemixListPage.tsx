import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createRemix } from "../service";
import { AddIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import routes from "../../routes";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import { Separator } from "../../@core/components/Separator";
import { useObserveList } from "../../@backend/hooks/useObserveModel";
import { Project, ProjectType } from "../../models";
import { DesktopView, Title } from "../../@core/components";
import ActionButton from "../components/shared/ActionButton";

type Props = {};
const RemixListPage: React.FC<Props> = () => {
  const history = useHistory();
  const group = useCurrentGroup();
  const { data: remixes } = useObserveList(Project, group?.id, (c) =>
    c.groupID("eq", group?.id || "").type("eq", ProjectType.REMIX)
  );

  const length = remixes.length || 0;

  return (
    <Layout
      nav="remix"
      desktop={
        <DesktopView>
          <Title level={1}>Remezclas</Title>
          <div className="flex py-4">
            <ActionButton
              icon={AddIcon}
              colors="bg-remixes text-black"
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
              Crear nueva remezcla
            </ActionButton>
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
        </DesktopView>
      }
    >
      <img src="/images/sections/community.jpg" alt="Remix" />
      <Separator className="bg-remixes">Remezclas - {group?.name}</Separator>
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
