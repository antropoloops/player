import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Redirect } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import routes from "../../routes";

type Props = {};

const AuthLogoutPage: React.FC<Props> = () => {
  const user = useCurrentUser();
  //if (!user) return <Redirect to={routes.root()} />;

  return (
    <Layout title="Cerrar sesión">
      <AmplifySignOut buttonText="Salir" />
    </Layout>
  );
};
export default AuthLogoutPage;
