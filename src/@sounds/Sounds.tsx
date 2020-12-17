import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";

import { SoundListPage } from "./pages/SoundListPage";
import { SoundEditPage } from "./pages/SoundEditPage";

type Props = {
  fallback: React.ComponentType<any>;
};

const Sound = ({ fallback: Fallback }: Props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path={routes.sounds()} component={SoundListPage} />
      <Route exact path={routes.soundEdit(":id")} component={SoundEditPage} />
      <Route component={Fallback} />
    </Switch>
  </Suspense>
);

export default Sound;
