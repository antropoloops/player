import React, { Suspense } from "react";
import Loading from "../shared/Loading";
import "./App.css";
import "./Footer.css";

const Router = React.lazy(() => import('./Router'));

export const App = () => (
  <Suspense fallback={<Loading />}>
    <Router />
  </Suspense>
);
