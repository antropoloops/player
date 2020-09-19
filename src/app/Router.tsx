import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";

// Static
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
// Audiosets
import BundlePage from "./pages/BundlePage";
// Guides
import GuideListPage from "./pages/GuideListPage";
import GuideShowPage from "./pages/GuideShowPage";
// Topics
import TopicListPage from "./pages/TopicListPage";
import TopicShowPage from "./pages/TopicShowPage";
// Work in progress
import PlayNextPage from "./pages/new/PlayNextPage";
import PlayRibbonPage from "./pages/new/PlayRibbonPage";
import ProjectShowPage from "./pages/ProjectShowPage";
import AudiosetShowPage from "./pages/AudiosetShowPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path={routes.root()} render={() => <HomePage />} />

      {/** PROYECTOS Y PLAYER **/}
      <Route exact={true} path={routes.projects()}>
        <ProjectShowPage idOrUrl="index" />
      </Route>
      <Route
        exact={true}
        path={routes.project(":id")}
        render={({ match }) => <ProjectShowPage idOrUrl={match.params.id} />}
      />
      <Route
        exact={true}
        path={routes.audioset(":id")}
        render={({ match }) => <AudiosetShowPage idOrUrl={match.params.id} />}
      />
      <Route
        exact={true}
        path={routes.testSet()}
        render={() => <BundlePage idOrUrl={getUrlFromParams()} />}
      />

      {/** LEGACY /sets route - redirect to /proyectos */}
      <Route exact={true} path={routes.sets()}>
        <Redirect to={routes.projects()} />
      </Route>
      <Route
        exact={true}
        path="/sets/:id"
        render={({ match }) => (
          <Redirect to={routes.project(match.params.id)} />
        )}
      />
      <Route
        exact={true}
        path="/set/:id"
        render={({ match }) => (
          <Redirect to={routes.project(match.params.id)} />
        )}
      />

      {/* TOPICS */}
      <Route exact={true} path={routes.topics()}>
        <TopicListPage />
      </Route>
      <Route exact={true} path={routes.topic(":id")}>
        <TopicShowPage />
      </Route>

      {/* GUIDES */}
      <Route exact={true} path={routes.guides()}>
        <GuideListPage />
      </Route>
      <Route exact={true} path={routes.guide(":id")}>
        <GuideShowPage />
      </Route>
      <Route exact={true} path={routes.file(":id")}>
        <GuideShowPage />
      </Route>

      <Route path={routes.about()} exact={true} component={AboutPage} />

      {/* EXPERIMENTAL */}
      <Route exact={true} path={routes.player(":id")}>
        <PlayNextPage />
      </Route>
      <Route exact={true} path={"/play-ribbon/:id"}>
        <PlayRibbonPage />
      </Route>

      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;

function getUrlFromParams(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("url") || "";
}
