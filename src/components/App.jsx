import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import IndexPage from "./IndexPage";
import AboutPage from "./AboutPage";
import PlayerPage from "./PlayerPage";
import ControlPage from "./ControlPage";
import NotFoundPage from "./NotFoundPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/p/:id" component={PlayerPage} />
        <Route path="/s/:id" component={ControlPage} />
        <Route path="/about/" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
