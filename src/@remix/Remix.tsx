import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";

import RemixListPage from "./pages/RemixListPage";
import RemixPlayPage from "./pages/RemixPlayPage";
import RemixPage from "./pages/RemixPage";
import ArchiveListPage from "./pages/ArchiveListPage";
import ArchivePage from "./pages/ArchiveShowPage";

import { useCurrentGroup } from "../@backend/hooks/useCurrentGroup";
import { NotAuthorizedPage } from "../@backend/pages/NotAuthorizedPage";
import { CurrentGroupContextProvider } from "../@backend/contexts/CurrentGroupContext";
const Remix = ({ fallback }: Props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CurrentGroupContextProvider>
        <Router fallback={fallback} />
      </CurrentGroupContextProvider>
    </Suspense>
  );
};

export default Remix;

type Props = {
  fallback: React.ComponentType<any>;
};

function Router({ fallback: Fallback }: Props) {
  const group = useCurrentGroup();

  if (!group)
    return (
      <NotAuthorizedPage message="Lo siento, tienes que estar en un grupo para ver ésto" />
    );
  return (
    <Switch>
      <Route exact path={routes.remixes()} component={RemixListPage} />
      <Route exact path={routes.remixPlay(":id")} component={RemixPlayPage} />
      <Route exact path={routes.remix(":id")} component={RemixPage} />
      <Route exact path={routes.remix(":id/*")} component={RemixPage} />

      {/* ARCHIVE */}
      <Route exact path={routes.archives()} component={ArchiveListPage} />
      <Route exact path={routes.archive(":id")} component={ArchivePage} />
      <Route component={Fallback} />
    </Switch>
  );
}
