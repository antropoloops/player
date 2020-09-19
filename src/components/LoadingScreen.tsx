import React from "react";
import Spinner from "./Spinner";
import Layout from "./layout/Layout";

const LoadingScreen = React.memo(() => {
  return (
    <Layout logo={true}>
      <div className="absolute inset-0 w-full flex flex-grow items-center justify-center min-h-full">
        <Spinner />
      </div>
    </Layout>
  );
});

export default LoadingScreen;
