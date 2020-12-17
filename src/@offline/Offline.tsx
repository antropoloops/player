import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";
import { TestPage } from "./pages/TestPage";

type Props = {
  fallback: React.ComponentType<any>;
};

const Archive = ({ fallback: Fallback }: Props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path={routes.offline()} component={TestPage} />
      <Route component={Fallback} />
    </Switch>
  </Suspense>
);

export default Archive;
