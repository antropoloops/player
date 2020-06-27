import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./routes";
import AboutPage from "./pages/AboutPage";
import BundlePage from "./pages/sets/BundlePage";
import NotFoundPage from "./pages/NotFoundPage";
import TopicListPage from "./pages/new/TopicListPage";
import TopicViewPage from "./pages/new/TopicViewPage";
import ProjectPage from "./pages/new/ProjectPage";
import AudiosetPage from "./pages/new/NewAudiosetPage";
import PlayerPage from "./pages/new/NewPlayerPage";
import HomePage from "./pages/new/HomePage";
import GuideListPage from "./pages/new/GuideListPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path={routes.root()} render={() => <HomePage />} />
      <Route
        exact={true}
        path={routes.sets()}
        render={() => <BundlePage idOrUrl="index" />}
      />
      <Route
        exact={true}
        path={routes.set(":id")}
        render={({ match }) => <BundlePage idOrUrl={match.params.id} />}
      />
      <Route
        exact={true}
        path={routes.testSet()}
        render={() => <BundlePage idOrUrl={getUrlFromParams()} />}
      />
      <Route exact={true} path={routes.projects()}>
        <ProjectPage />
      </Route>
      <Route exact={true} path={routes.project(":id")}>
        <ProjectPage />
      </Route>
      <Route exact={true} path={routes.topics()}>
        <TopicListPage />
      </Route>
      <Route exact={true} path={routes.topic(":id")}>
        <TopicViewPage />
      </Route>
      <Route exact={true} path={routes.guides()}>
        <GuideListPage />
      </Route>
      <Route exact={true} path={routes.audioset(":id")}>
        <AudiosetPage />
      </Route>
      <Route exact={true} path={routes.player(":id")}>
        <PlayerPage />
      </Route>
      <Route path={routes.about()} exact={true} component={AboutPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;

function getUrlFromParams(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("url") || "";
}