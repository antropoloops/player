import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import AboutPage from "./pages/AboutPage";
import PlayerPage from "./pages/PlayerPage";
import Explore from "./pages/Explore.page";
import TestPlayerPage from "./pages/TestPlayerPage";
import ControlPage from "./pages/ControlPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/p/:id" component={PlayerPage} />
        <Route path="/explore/:id?" component={Explore} />
        <Route path="/test" component={TestPlayerPage} />
        <Route path="/s/:id" component={ControlPage} />
        <Route path="/about/" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
