import React from "react";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import Layout from "../../components/layout/Layout";
import { useCurrentUser } from "../hooks/useCurrentUser";

type Props = {};
const LoginPage: React.FC<Props> = () => {
  const user = useCurrentUser();
  return (
    <Layout
      nav="admin"
      title="Entrar"
      desktop={
        <AmplifyAuthenticator>
          <AmplifySignIn
            hideSignUp
            headerText="Escribe tus datos para entrar"
            slot="sign-in"
            formFields={[
              {
                type: "email",
                label: "Email",
                placeholder: "",
                required: true,
              },
              {
                type: "password",
                label: "Contraseña",
                placeholder: "",
                required: true,
              },
            ]}
          ></AmplifySignIn>
        </AmplifyAuthenticator>
      }
    >
      <div className="p-4">
        <div>{user?.email}</div>
        <div className="p-4 text-white">
          El editor no funciona aún en móvil.
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
