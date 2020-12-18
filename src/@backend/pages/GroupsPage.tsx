import React, { useState } from "react";
import { DesktopView, Heading, List } from "../../@core/components";
import { listProjectSections } from "../../@core/helpers/sectionHelpers";
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
          <List
            className="max-w-lg border-t border-white"
            items={groups || []}
            render={(group) => (
              <li className="py-1 border-b border-white" key={group.id}>
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
