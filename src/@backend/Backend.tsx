import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";
import { AuthContextProvider } from "./contexts/AuthContext";

import OfflineDebugPage from "./pages/OfflineDebugPage";
import GroupsPage from "./pages/GroupsPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";

type Props = {
  fallback: React.ComponentType<any>;
};

const Backend = ({ fallback: Fallback }: Props) => (
  <Suspense fallback={<LoadingScreen />}>
    <AuthContextProvider>
      <Switch>
        <Route exact path={routes.adminDebug()} component={OfflineDebugPage} />
        <Route exact path={routes.adminGroups()} component={GroupsPage} />
        <Route exact path={routes.adminLogin()} component={LoginPage} />
        <Route exact path={routes.adminLogout()} component={LogoutPage} />
        <Route component={Fallback} />
      </Switch>
    </AuthContextProvider>
  </Suspense>
);

export default Backend;
