import { DataStore } from "aws-amplify";
import React from "react";
import { Separator } from "../../@core/components";
import IconButtonBig from "../../@remix/components/shared/Buttons";
import { AddIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import { Group } from "../../models";
import MediaObject from "../../components/MediaObject";
import routes from "../../routes";
import { Link, useParams } from "react-router-dom";
import ShowEditGroup from "../components/ShowEditGroup";
import { useObserveList } from "../hooks/useObserveModel";

type Props = {
  className?: string;
};

export function GroupsPage({ className }: Props) {
  const params = useParams<{ id?: string }>();
  const { data: groups } = useObserveList(Group, "all");

  const group = params.id ? groups.find((g) => g.id === params.id) : undefined;

  return (
    <Layout
      title="Grupos"
      nav="admin"
      desktop={group && <ShowEditGroup group={group} />}
    >
      <Link to={routes.adminGroups()}>
        <img src="/images/sections/community.jpg" alt="Remix" />
        <Separator className="bg-remixes">Grupos</Separator>
      </Link>
      <div className="flex">
        <IconButtonBig
          icon={AddIcon}
          onClick={() => {
            DataStore.save(
              new Group({
                name: "nuevo-grupo-" + ((groups?.length || 0) + 1),
                meta: {},
              })
            );
          }}
        >
          Añadir grupo
        </IconButtonBig>
      </div>
      {groups?.map((group) => (
        <MediaObject
          key={group.id}
          alt=""
          image=""
          ratio="1:1"
          to={routes.adminGroup(group.id)}
        >
          <div className="w-full flex flex-col justify-center group px-2">
            <div>{group.name}</div>
          </div>
        </MediaObject>
      ))}
    </Layout>
  );
}

export default GroupsPage;
