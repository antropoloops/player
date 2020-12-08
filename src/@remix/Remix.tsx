import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";

import RemixEditPage from "./pages/RemixEditPage";
import RemixListPage from "./pages/RemixListPage";
import RemixPlayPage from "./pages/RemixPlayPage";

type Props = {
  fallback: React.ComponentType<any>;
};

const Remix = ({ fallback: Fallback }: Props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path={routes.remix()} component={RemixListPage} />
      <Route exact path={routes.remixPlay(":id")} component={RemixPlayPage} />
      <Route
        exact
        path={routes.remixEditItemChild(":id", ":type?", ":childId?")}
        component={RemixEditPage}
      />
      <Route component={Fallback} />
    </Switch>
  </Suspense>
);

export default Remix;
