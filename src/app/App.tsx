import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import SetConductorPage from "./pages/BundlePage";
import NotFoundPage from "./pages/NotFoundPage";

import "./styles/tailwind.css";
import { autoUnlockAudio } from "../lib/active-audio-context";
import routes from "./routes";
import TopicListPage from "./pages/TopicListPage";
import TopicViewPage from "./pages/TopicViewPage";

const App = () => {
  useEffect(() => {
    autoUnlockAudio();
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={routes.root()}
          exact={true}
          render={() => <SetConductorPage idOrUrl="index" />}
        />
        <Route
          path={routes.set(":id")}
          exact={true}
          render={({ match }) => <SetConductorPage idOrUrl={match.params.id} />}
        />
        <Route
          path={routes.testSet()}
          exact={true}
          render={() => <SetConductorPage idOrUrl={getUrlFromParams()} />}
        />
        <Route exact={true} path={routes.topics()}>
          <TopicListPage />
        </Route>
        <Route exact={true} path={routes.topic(":id")}>
          <TopicViewPage />
        </Route>
        <Route path={routes.about()} exact={true} component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;

function getUrlFromParams(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("url") || "";
}
