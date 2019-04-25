import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Modal from "./components/Modal";

function Index() {
  return (
    <Modal>
      <h2>Antropoloops player</h2>
      <p>Cooming soon...</p>
      <Link to="/about/">About</Link>
    </Modal>
  );
}

function About() {
  return (
    <Modal>
      <h2>About</h2>
      <p>
        Antropoloops player allow to play Antropoloops sets withing the browser.
      </p>
      <p>MakeyMakey is recommended.</p>
      <Link to="/">Go back</Link>
    </Modal>
  );
}

function PathNotFound() {
  return (
    <Modal>
      <h2>Page doesn't exist</h2>
      <p>Sorry, we didn't found what you're looking for</p>
      <Link to="/">Go back</Link>
    </Modal>
  );
}

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route component={PathNotFound} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
