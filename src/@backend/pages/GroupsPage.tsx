import { DataStore } from "aws-amplify";
import React, { useState } from "react";
import {
  DesktopView,
  Heading,
  List,
  Separator,
  Title,
} from "../../@core/components";
import IconButtonBig from "../../@remix/components/shared/Buttons";
import { AddIcon, LoginIcon, EditIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import { Group } from "../../models";
import { GroupForm } from "../components/GroupForm";
import { updateGroup } from "../service";
import { useObserveList } from "../hooks/useObserveModel";
import MediaObject from "../../components/MediaObject";
import routes from "../../routes";
import { Header } from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "../../components/shared/IconButton";
import { setCurrentGroup } from "../contexts/CurrentGroupContext";

type Props = {
  className?: string;
};

export function GroupsPage({ className }: Props) {
  const params = useParams<{ id?: string }>();
  const [editGroup, setEditGroup] = useState<Group | undefined>();
  const { data: groups } = useObserveList(Group);

  const group = params.id ? groups.find((g) => g.id === params.id) : undefined;

  return (
    <Layout
      title="Grupos"
      nav="projects"
      desktop={
        group && (
          <DesktopView>
            <Title level={1}>{group.name}</Title>
            {editGroup && (
              <GroupForm
                group={editGroup}
                onSubmit={(data) => {
                  updateGroup(editGroup, data);
                  setEditGroup(undefined);
                }}
              />
            )}
            <div className="flex my-4">
              <IconButton
                className="mr-4"
                icon={EditIcon}
                onClick={() => {
                  setEditGroup(group);
                }}
              >
                Editar
              </IconButton>
              <IconButton
                icon={LoginIcon}
                onClick={() => {
                  setCurrentGroup(group.id);
                }}
              >
                Entrar
              </IconButton>
            </div>
          </DesktopView>
        )
      }
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
