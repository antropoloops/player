import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";

// Static
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

// Projects and Audiosets (ProjectList is ProjectShow id=index)
import ProjectShowPage from "./pages/ProjectShowPage";
import AudiosetShowPage from "./pages/AudiosetShowPage";
import AudiosetReadmePage from "./pages/CommunityReadmePage";

// Guides
import GuideListPage from "./pages/GuideListPage";
import GuideShowPage from "./pages/GuideShowPage";

// Topics
import TopicListPage from "./pages/TopicListPage";
import TopicShowPage from "./pages/TopicShowPage";

// Work in progress
import PlayNextPage from "./pages/new/PlayNextPage";
import PlayRibbonPage from "./pages/new/PlayRibbonPage";

import LoadingScreen from "./components/LoadingScreen";

const Archive = lazy(() => import("./@archive"));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route exact path={routes.root()} render={() => <HomePage />} />

        {/** PROYECTOS Y PLAYER **/}
        <Route exact path={routes.projects()}>
          <ProjectShowPage idOrUrl="index" />
        </Route>
        <Route exact path={routes.community()}>
          <ProjectShowPage idOrUrl="comunidad" sectionName="community" readme />
        </Route>
        <Route
          exact
          path={routes.project(":id")}
          render={({ match }) => <ProjectShowPage idOrUrl={match.params.id} />}
        />
        <Route
          exact
          path={routes.readme(":id")}
          render={({ match }) => (
            <AudiosetReadmePage idOrUrl={match.params.id} />
          )}
        />
        <Route
          exact
          path={routes.audioset(":id")}
          render={({ match }) => <AudiosetShowPage idOrUrl={match.params.id} />}
        />
        <Route
          exact
          path={routes.testSet()}
          render={() => <AudiosetShowPage idOrUrl={getUrlFromParams()} />}
        />

        {/** LEGACY /sets route - redirect to /proyectos */}
        <Route exact path={routes.sets()}>
          <Redirect to={routes.projects()} />
        </Route>
        <Route
          exact
          path="/sets/:id"
          render={({ match }) => (
            <Redirect to={routes.project(match.params.id)} />
          )}
        />
        <Route
          exact
          path="/set/:id"
          render={({ match }) => (
            <Redirect to={routes.project(match.params.id)} />
          )}
        />

        {/* TOPICS */}
        <Route exact path={routes.topics()}>
          <TopicListPage />
        </Route>
        <Route exact path={routes.topic(":id")}>
          <TopicShowPage />
        </Route>

        {/* GUIDES */}
        <Route exact path={routes.guides()}>
          <GuideListPage />
        </Route>
        <Route exact path={routes.guide(":id")}>
          <GuideShowPage />
        </Route>
        <Route exact path={routes.file(":id")}>
          <GuideShowPage />
        </Route>

        <Route path={routes.archives() + "*"} exact component={Archive} />

        <Route path={routes.about()} exact component={AboutPage} />

        {/* EXPERIMENTAL */}
        <Route exact path={routes.player(":id")}>
          <PlayNextPage />
        </Route>
        <Route exact path={"/play-ribbon/:id"}>
          <PlayRibbonPage />
        </Route>

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;

function getUrlFromParams(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("url") || "";
}
