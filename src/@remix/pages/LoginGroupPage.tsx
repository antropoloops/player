import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { setCurrentGroup } from "../../@backend/contexts/CurrentGroupContext";
import { NotAuthorizedPage } from "../../@backend/pages/NotAuthorizedPage";
import routes from "../../routes";

type Props = {
  className?: string;
};

const GROUPS: Record<string, string> = {
  prueba: "e8ed483c-860b-4174-ab4f-826a2bf17132",
  dev: "0cf82efa-ed84-41da-aba4-a58be54c34e8",
};

export default function LoginGroupPage({ className }: Props) {
  const params = useParams<{ id?: string }>();
  const history = useHistory();

  const groupId = GROUPS[params.id || ""];

  if (groupId) {
    setCurrentGroup(groupId);
    history.push(routes.remixes());
  } else {
    return <NotAuthorizedPage />;
  }

  return <div className={className}>{params.id}</div>;
}
