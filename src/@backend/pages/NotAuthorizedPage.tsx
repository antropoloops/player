import React from "react";
import Layout from "../../components/layout/Layout";

type Props = { message?: string };

const DEFAULT_MESSAGE = "Lo siento, no tienes permisos para hacer ésto";

export function NotAuthorizedPage({ message }: Props) {
  return (
    <Layout>
      <p className="p-4 text-white">{message || DEFAULT_MESSAGE}</p>
    </Layout>
  );
}

export default NotAuthorizedPage;
