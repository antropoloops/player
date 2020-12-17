import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";

import RemixListPage from "./pages/RemixListPage";
import RemixPlayPage from "./pages/RemixPlayPage";
import RemixShowPage from "./pages/RemixShowPage";
import { useCurrentGroup } from "../@offline/hooks/useCurrentGroup";
import { NotAuthorizedPage } from "../@offline/pages/NotAuthorizedPage";
import { CurrentGroupContextProvider } from "../@offline/contexts/CurrentGroupContext";

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
      <Route exact path={routes.remix(":id")} component={RemixShowPage} />
      <Route
        exact
        path={routes.remixRelation(":id", ":type?", ":childId?")}
        component={RemixShowPage}
      />
      <Route component={Fallback} />
    </Switch>
  );
}
type Props = {
  fallback: React.ComponentType<any>;
};