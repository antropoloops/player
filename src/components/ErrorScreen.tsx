import React from "react";
import Layout from "./layout/Layout";

type Props = {
  message: string;
};

const ErrorScreen: React.FC<Props> = ({ message }) => {
  return (
    <Layout logo={true}>
      <div className="absolute inset-0 w-full flex flex-grow items-center justify-center min-h-full">
        <h1 className="text-white p-4">{message}</h1>
      </div>
    </Layout>
  );
};

export default ErrorScreen;
