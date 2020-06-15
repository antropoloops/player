import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./routes";
import AboutPage from "./pages/AboutPage";
import SetConductorPage from "./pages/BundlePage";
import NotFoundPage from "./pages/NotFoundPage";
import TopicListPage from "./pages/new/TopicListPage";
import TopicViewPage from "./pages/new/TopicViewPage";
import ProjectPage from "./pages/new/ProjectPage";
import AudiosetPage from "./pages/new/NewAudiosetPage";
import PlayerPage from "./pages/new/NewPlayerPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path={routes.root()}
        exact={true}
        render={() => <SetConductorPage idOrUrl="index" />}
      />
      <Route
        path={routes.set(":id")}
        exact={true}
        render={({ match }) => <SetConductorPage idOrUrl={match.params.id} />}
      />
      <Route
        path={routes.testSet()}
        exact={true}
        render={() => <SetConductorPage idOrUrl={getUrlFromParams()} />}
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
