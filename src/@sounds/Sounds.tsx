import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import routes from "../routes";

import { SoundListPage } from "./pages/SoundListPage";
import { SoundEditPage } from "./pages/SoundEditPage";
import SoundsPage from "./pages/SoundsPage";
import { CurrentGroupContextProvider } from "../@backend/contexts/CurrentGroupContext";

type Props = {
  fallback: React.ComponentType<any>;
};

const Sound = ({ fallback }: Props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CurrentGroupContextProvider>
        <Router fallback={fallback} />
      </CurrentGroupContextProvider>
    </Suspense>
  );
};

export default Sound;

const Router = ({ fallback: Fallback }: Props) => (
  <Switch>
    <Route exact path={routes.sounds()} component={SoundsPage} />
    <Route exact path={routes.soundEdit(":id")} component={SoundEditPage} />
    <Route component={Fallback} />
  </Switch>
);
