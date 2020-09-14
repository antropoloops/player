import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";

// Static
import HomePage from "./pages/new/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
// Audiosets
import BundlePage from "./pages/sets/BundlePage";
// Guides
import GuideListPage from "./pages/GuideListPage";
import GuideShowPage from "./pages/GuideShowPage";
// Topics
import TopicListPage from "./pages/TopicListPage";
import TopicShowPage from "./pages/TopicShowPage";
// Work in progress
import ProjectPage from "./pages/new/ProjectPage";
import AudiosetPage from "./pages/new/NewAudiosetPage";
import PlayerPage from "./pages/new/NewPlayerPage";
import Player2Page from "./pages/new/Player2RibbonPage";
import ExplorePage from "./pages/new/ExplorePage";

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
      {/** LEGACY REDIRECT */}
      <Route
        exact={true}
        path="/set/:id"
        render={({ match }) => <Redirect to={routes.set(match.params.id)} />}
      />
      <Route
        exact={true}
        path={routes.testSet()}
        render={() => <BundlePage idOrUrl={getUrlFromParams()} />}
      />
      <Route
        exact={true}
        path={routes.explore(":id")}
        component={ExplorePage}
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

      {/* EXPERIMENTAL */}
      <Route exact={true} path={routes.audioset(":id")}>
        <AudiosetPage />
      </Route>
      <Route exact={true} path={routes.player(":id")}>
        <PlayerPage />
      </Route>
      <Route exact={true} path={"/next/player"}>
        <Player2Page />
      </Route>
      <Route path={routes.about()} exact={true} component={AboutPage} />

      <Route exact={true} path={routes.projects()}>
        <ProjectPage />
      </Route>
      <Route exact={true} path={routes.project(":id")}>
        <ProjectPage />
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
