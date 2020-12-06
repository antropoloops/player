import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";
import HomePage from "./pages/HomePage";
import OfflineArchivePage from "./pages/OfflineArchivePage";

const Archive = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path={routes.archives()} component={HomePage} />
      <Route
        exact
        path={routes.archiveOffline()}
        component={OfflineArchivePage}
      />
    </Switch>
  </Suspense>
);

export default Archive;
