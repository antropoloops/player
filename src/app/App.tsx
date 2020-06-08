import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import SetConductorPage from "./pages/BundlePage";
import NotFoundPage from "./pages/NotFoundPage";

import "./styles/tailwind.css";
import "./App.css";
import { autoUnlockAudio } from "../lib/active-audio-context";

const App = () => {
  useEffect(() => {
    autoUnlockAudio();
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => <SetConductorPage idOrUrl="index" />}
        />
        <Route
          path="/set/:id"
          exact={true}
          render={({ match }) => <SetConductorPage idOrUrl={match.params.id} />}
        />
        <Route
          path="/test"
          exact={true}
          render={() => <SetConductorPage idOrUrl={getUrlFromParams()} />}
        />
        <Route path="/about" exact={true} component={AboutPage} />
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
