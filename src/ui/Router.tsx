import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { About } from "./screens/About";
import { Audioset } from "./screens/Audioset";
import NotFound from "./screens/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => <Audioset idOrUrl="index" />}
        />
        <Route
          path="/set/:id"
          exact={true}
          render={({ match }) => <Audioset idOrUrl={match.params.id} />}
        />
        <Route
          path="/test"
          exact={true}
          render={() => <Audioset idOrUrl={getUrlFromParams()} />}
        />
        <Route path="/about" exact={true} component={About} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;

function getUrlFromParams(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("url") || "";
}
