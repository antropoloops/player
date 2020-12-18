import { DataStore } from "aws-amplify";
import React, { useState } from "react";
import { DesktopView, Heading, List } from "../../@core/components";
import { listProjectSections } from "../../@core/helpers/sectionHelpers";
import IconButtonBig from "../../@remix/components/shared/Buttons";
import { AddIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import { Group } from "../../models";
import { GroupForm } from "../components/GroupForm";
import { useListGroupsQuery } from "../hooks/useOfflineQueries";
import { updateGroup } from "../service";

type Props = {
  className?: string;
};

export function GroupsPage({ className }: Props) {
  const [group, setGroup] = useState<Group | undefined>();
  const { data: groups, refetch } = useListGroupsQuery();
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
                updateGroup(group, data).then(() => {
                  refetch();
                });
                setGroup(undefined);
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
                ).then(() => refetch());
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
                    setGroup(group);
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
