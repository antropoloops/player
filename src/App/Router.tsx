import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import "./index.css";
import NotFound from "./NotFound";
// import Explore from "./pages/Explore.page";
// import NotFoundPage from "./pages/NotFoundPage";

// App layout styles are defined at index.html

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/set/:id" exact={true} component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
