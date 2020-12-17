import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { CurrentGroupContextProvider } from "../@offline/contexts/CurrentGroupContext";
import { useCurrentGroup } from "../@offline/hooks/useCurrentGroup";
import { NotAuthorizedPage } from "../@offline/pages/NotAuthorizedPage";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";
import ArchiveListPage from "./pages/ArchiveListPage";
import ArchiveShowPage from "./pages/ArchiveShowPage";
import OfflineAudioPage from "./pages/OfflineAudioPage";

type Props = {
  fallback: React.ComponentType<any>;
};

const Archive = ({ fallback }: Props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CurrentGroupContextProvider>
        <Router fallback={fallback} />
      </CurrentGroupContextProvider>
    </Suspense>
  );
};

function Router({ fallback: Fallback }: Props) {
  const group = useCurrentGroup();

  if (!group)
    return (
      <NotAuthorizedPage message="Lo siento, tienes que estar en un grupo para ver ésto" />
    );
  return (
    <Switch>
      <Route exact path={routes.archives()} component={ArchiveListPage} />
      <Route exact path={routes.archive(":id")} component={ArchiveShowPage} />
      <Route
        exact
        path={routes.archiveOfflineMedia(":id")}
        component={OfflineAudioPage}
      />
      <Route component={Fallback} />
    </Switch>
  );
}

export default Archive;
