import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { About } from "./pages/About";
import { Audioset } from "./pages/Audioset";
import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
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

export default App;

function getUrlFromParams(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("url") || "";
}
