import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";

import OfflineDebugPage from "./pages/OfflineDebugPage";
import GroupsPage from "./pages/GroupsPage";

type Props = {
  fallback: React.ComponentType<any>;
};

const Archive = ({ fallback: Fallback }: Props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path={routes.offline()} component={OfflineDebugPage} />
      <Route exact path={routes.groups()} component={GroupsPage} />
      <Route component={Fallback} />
    </Switch>
  </Suspense>
);

export default Archive;
