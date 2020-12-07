import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";
import ArchiveListPage from "./pages/ArchiveListPage";
import OfflineArchivePage from "./pages/OfflineArchivePage";
import OfflineAudioPage from "./pages/OfflineAudioPage";

const Archive = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path={routes.archives()} component={ArchiveListPage} />
      <Route
        exact
        path={routes.archiveOffline()}
        component={OfflineArchivePage}
      />
      <Route
        exact
        path={routes.archiveOfflineMedia(":id")}
        component={OfflineAudioPage}
      />
    </Switch>
  </Suspense>
);

export default Archive;
