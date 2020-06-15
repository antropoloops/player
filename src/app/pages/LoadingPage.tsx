import React from "react";
import { Spinner } from "../components/Spinner";
import Layout from "../components/layout/Layout";

const LoadingPage = React.memo(() => {
  return (
    <Layout logo={true}>
      <div className="flex flex-grow items-center justify-center">
        <Spinner />
      </div>
    </Layout>
  );
});

export default LoadingPage;
