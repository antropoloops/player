import { Route, Switch, useParams } from "react-router-dom";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import {
  useObserveList,
  useObserveModel,
} from "../../@backend/hooks/useObserveModel";
import NotAuthorizedPage from "../../@backend/pages/NotAuthorizedPage";
import Layout from "../../components/layout/Layout";
import { Project, Track, Clip } from "../../models";
import routes from "../../routes";
import RemixBrowser from "../components/remix/RemixBrowser";
import RemixShow from "../components/remix/RemixShow";
import RemixEdit from "../components/remix/RemixEdit";
import { DesktopView } from "../../@core/components";

export default function RemixPage() {
  const params = useParams<{ id: string }>();
  const remixId = params.id;
  const group = useCurrentGroup();
  const { data: remix, isLoading } = useObserveModel(Project, remixId);
  const { data: tracks } = useObserveList(Track, remixId, (t) =>
    t.projectID("eq", remixId)
  );
  const { data: clips } = useObserveList(Clip, remixId, (t) =>
    t.projectID("eq", remixId)
  );

  if (!group) return <NotAuthorizedPage />;
  if (!remix) return <Layout />;

  const context = { group, isLoading, remix, tracks, clips };

  return (
    <Layout
      nav="projects"
      desktop={
        <DesktopView>
          <Switch>
            <Route exact path={routes.remix(":id")}>
              <RemixShow {...context} />
            </Route>
            <Route exact path={routes.remixEdit(":id")}>
              <RemixEdit {...context} />
            </Route>
            <Route path="*">
              <div>Error</div>
            </Route>
          </Switch>
        </DesktopView>
      }
    >
      {<RemixBrowser {...context} />}
    </Layout>
  );
}
