import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.page";
import Explore from "./pages/Explore.page";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/set/:id?" component={Explore} />
        <Route path="/test/:id?" component={Explore} />
        <Route path="/p/:id?" component={Explore} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
