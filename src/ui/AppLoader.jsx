import React, { Suspense } from "react";
import Loading from "./components/shared/Loading";
const App = React.lazy(() => import("./App"));

const AppLoader = () => {
  return (
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
};

export default AppLoader;
