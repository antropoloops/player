import React, { useState } from "react";
import { DataStore } from "aws-amplify";
import { DesktopView, Separator, Title } from "../../@core/components";
import { LoginIcon, EditIcon, DeleteIcon } from "../../components/icons/Icons";
import { Group, Project } from "../../models";
import { GroupForm } from "../components/GroupForm";
import { updateGroup } from "../service";
import { setCurrentGroup } from "../contexts/CurrentGroupContext";
import ActionButton from "../../@remix/components/shared/ActionButton";

type Props = {
  group: Group;
};

async function deleteGroup(group: Group) {
  const projects = await DataStore.query(Project, (p) =>
    p.groupID("eq", group.id)
  );
  console.log("tiene proyectos", projects);
  if (projects.length) {
    return false;
  }
  const deleted = await DataStore.delete(group);
  console.log("del", deleted);
  return true;
}

export default function ShowEditGroup({ group }: Props) {
  const [editGroup, setEditGroup] = useState<Group | undefined>();
  return (
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
      <div className="flex my-4 text-black">
        <ActionButton
          icon={EditIcon}
          onClick={() => {
            setEditGroup(group);
          }}
        >
          Editar
        </ActionButton>
        <ActionButton
          icon={LoginIcon}
          onClick={() => {
            setCurrentGroup(group.id);
          }}
        >
          Entrar
        </ActionButton>
        <ActionButton
          icon={DeleteIcon}
          colors=""
          onClick={() => {
            deleteGroup(group);
          }}
        >
          Borrar grupo
        </ActionButton>
      </div>
    </DesktopView>
  );
}
