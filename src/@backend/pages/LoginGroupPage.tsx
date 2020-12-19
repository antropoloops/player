import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { setCurrentGroup } from "../contexts/CurrentGroupContext";
import { NotAuthorizedPage } from "./NotAuthorizedPage";
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

  const groupId = GROUPS[params.id || ""];

  if (groupId) {
    setCurrentGroup(groupId);
    return <Redirect to={routes.remixes()} />;
  } else {
    return <NotAuthorizedPage />;
  }
}
