import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { setCurrentGroup } from "../contexts/CurrentGroupContext";
import { NotAuthorizedPage } from "./NotAuthorizedPage";
import routes from "../../routes";
import Layout from "../../components/layout/Layout";
import { DesktopView, Title } from "../../@core/components";
import { useObserveModel } from "../hooks/useObserveModel";
import { Group } from "../../models";
import ActionButton from "../../@remix/components/shared/ActionButton";
import { LoginIcon } from "../../components/icons/Icons";
import Spinner from "../../components/Spinner";

type Props = {
  className?: string;
};

const GROUPS: Record<string, string> = {
  prueba: "e8ed483c-860b-4174-ab4f-826a2bf17132",
  dev: "0cf82efa-ed84-41da-aba4-a58be54c34e8",
};

type Status = "ready" | "loggingIn" | "loggedIn";

export default function LoginGroupPage({ className }: Props) {
  const params = useParams<{ id?: string }>();
  const groupId = GROUPS[params.id || ""];

  const [status, setStatus] = useState<Status>("ready");
  const { data: group } = useObserveModel(Group, groupId);

  if (status === "loggedIn") {
    return <Redirect to={routes.remixes()} />;
  } else if (!groupId) {
    return <NotAuthorizedPage />;
  }

  return (
    <Layout
      nav="admin"
      desktop={
        <DesktopView>
          <Title level={1}>{group?.name || "Entrar"}</Title>
          {group && (
            <div className="mt-4">
              <p className="my-4">¿Quieres entrar al grupo?</p>
              {status === "ready" ? (
                <ActionButton
                  icon={LoginIcon}
                  onClick={() => {
                    setStatus("loggingIn");
                    setCurrentGroup(groupId).then(() => {
                      setStatus("loggedIn");
                    });
                  }}
                >
                  Si, entrar
                </ActionButton>
              ) : (
                <Spinner />
              )}
            </div>
          )}
        </DesktopView>
      }
    ></Layout>
  );
}
