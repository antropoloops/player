import React from "react";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import Layout from "../../components/layout/Layout";

type Props = {};
const LoginPage: React.FC<Props> = () => {
  return (
    <Layout
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
      <div className="p-8 text-white">El editor no funciona aún en móvil.</div>
    </Layout>
  );
};
export default LoginPage;
