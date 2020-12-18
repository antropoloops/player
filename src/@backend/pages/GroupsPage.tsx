import { DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { DesktopView, Heading, List } from "../../@core/components";
import IconButtonBig from "../../@remix/components/shared/Buttons";
import { AddIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import { Group } from "../../models";
import { GroupForm } from "../components/GroupForm";
import { updateGroup } from "../service";
import { useObserveModel } from "../hooks/useObserveModel";

type Props = {
  className?: string;
};

export function GroupsPage({ className }: Props) {
  const [group, setEditGroup] = useState<Group | undefined>();
  const { data: groups } = useObserveModel(Group);

  return (
    <Layout
      nav="projects"
      desktop={
        <DesktopView>
          <Heading level={1}>Grupos</Heading>
          {group && (
            <GroupForm
              group={group}
              onSubmit={(data) => {
                updateGroup(group, data);
                setEditGroup(undefined);
              }}
            />
          )}
          <div className="flex my-4">
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
          <List
            className="mt-4 max-w-lg  border-t border-gray-light"
            items={groups || []}
            render={(group) => (
              <li
                className="py-1 border-b border-gray-light opacity-75 hover:opacity-100"
                key={group.id}
              >
                <button
                  onClick={() => {
                    setEditGroup(group);
                  }}
                >
                  {group.name}
                </button>
              </li>
            )}
          />
        </DesktopView>
      }
    ></Layout>
  );
}

export default GroupsPage;
