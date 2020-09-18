import React from "react";
import Spinner from "../components/Spinner";
import Layout from "../components/layout/Layout";

const LoadingPage = React.memo(() => {
  return (
    <Layout logo={true}>
      <div className="absolute inset-0 w-full flex flex-grow items-center justify-center min-h-full">
        <Spinner />
      </div>
    </Layout>
  );
});

export default LoadingPage;
