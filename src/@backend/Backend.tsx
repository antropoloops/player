import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";

import OfflineDebugPage from "./pages/OfflineDebugPage";
import GroupsPage from "./pages/GroupsPage";
import LoginPage from "./pages/LoginPage";

type Props = {
  fallback: React.ComponentType<any>;
};

const Backend = ({ fallback: Fallback }: Props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path={routes.adminDebug()} component={OfflineDebugPage} />
      <Route exact path={routes.adminGroups()} component={GroupsPage} />
      <Route exact path={routes.adminLogin()} component={LoginPage} />
      <Route component={Fallback} />
    </Switch>
  </Suspense>
);

export default Backend;
