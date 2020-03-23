import React, { Suspense } from "react";
import "./App.css";
import { Loading } from "./shared/Loading";

const Router = React.lazy(() => import("./Router"));

export const App = () => (
  <Suspense fallback={<Loading />}>
    <Router />
  </Suspense>
);
