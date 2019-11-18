import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import { LoadAudioset } from "./LoadAudioset";
import NotFound from "./NotFound";

// App layout styles are defined at index.html
const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => <LoadAudioset idOrUrl="index" />}
        />
        <Route
          path="/set/:id"
          exact={true}
          render={({ match }) => <LoadAudioset idOrUrl={match.params.id} />}
        />
        <Route
          path="/test"
          exact={true}
          render={() => <LoadAudioset idOrUrl={getUrlFromParams()} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;

function getUrlFromParams(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("url") || "";
}
