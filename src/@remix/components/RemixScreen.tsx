import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../routes";
import {
  useObserveList,
  useObserveModel,
} from "../../@backend/hooks/useObserveModel";
import { Project, Clip, Track } from "../../models";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import NotAuthorizedPage from "../../@backend/pages/NotAuthorizedPage";
import RemixShow from "./remix/RemixShow";

export default function RemixScreen({ remixId }: { remixId: string }) {
  const group = useCurrentGroup();
  const { data: remix, isLoading } = useObserveModel(Project, remixId);
  const { data: tracks } = useObserveList(Track, remixId, (t) =>
    t.projectID("eq", remixId)
  );
  const { data: clips } = useObserveList(Clip, remixId, (t) =>
    t.projectID("eq", remixId)
  );
  if (!group) return <NotAuthorizedPage />;
  if (!remix) return null;

  const context = { group, isLoading, remix, tracks, clips };
  return (
    <Switch>
      <Route
        exact
        path={routes.remix(":id")}
        render={({ match: { params } }) => <RemixShow {...context} />}
      />
    </Switch>
  );
}
