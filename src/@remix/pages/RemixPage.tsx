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
import EditImage from "../components/image/ImageEdit";
import { DataStore } from "aws-amplify";
import TrackShow from "../components/track/TrackShow";
import ClipShow from "../components/clip/ClipShow";
import { RemixEditProps } from "../contexts/RemixContext";
import ClipEditCover from "../components/clip/ClipEditCover";
import ClipEdit from "../components/clip/ClipEdit";
import ClipAudioEdit from "../components/clip/ClipEditAudio";

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
            <Route exact path={routes.remixCover(":id")}>
              <RemixEditCover {...context} />
            </Route>
            <Route exact path={routes.remixEditBackground(":id")}>
              <RemixEditBackground {...context} />
            </Route>
            <Route
              exact
              path={routes.remixTrack(":id", ":trackId")}
              render={({ match: { params } }) => (
                <TrackShow {...context} trackId={params.trackId} />
              )}
            />
            <Route
              exact
              path={routes.remixClip(":id", ":clipId")}
              render={({ match: { params } }) => (
                <ClipShow {...context} clipId={params.clipId} />
              )}
            />
            <Route
              exact
              path={routes.remixClipCover(":id", ":clipId")}
              render={({ match: { params } }) => (
                <ClipEditCover {...context} clipId={params.clipId} />
              )}
            />
            <Route
              exact
              path={routes.remixClipAudio(":id", ":clipId")}
              render={({ match: { params } }) => (
                <ClipAudioEdit {...context} clipId={params.clipId} />
              )}
            />
            <Route
              exact
              path={routes.remixClipEdit(":id", ":clipId")}
              render={({ match: { params } }) => (
                <ClipEdit {...context} clipId={params.clipId} />
              )}
            />

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

function RemixEditCover({ group, remix }: RemixEditProps) {
  return (
    <EditImage
      group={group}
      remix={remix}
      aspect={16 / 9}
      backTo={routes.remix(remix.id)}
      editableImage={remix.image}
      saveImage={async (current) => {
        return DataStore.save(
          Project.copyOf(remix, (draft) => {
            if (draft.image) {
              draft.image.current = current;
            }
          })
        );
      }}
    />
  );
}

function RemixEditBackground({ group, remix }: RemixEditProps) {
  return (
    <EditImage
      group={group}
      remix={remix}
      aspect={16 / 9}
      backTo={routes.remix(remix.id)}
      editableImage={remix.display?.image}
      saveImage={async (current) => {
        return DataStore.save(
          Project.copyOf(remix, (draft) => {
            if (draft.display?.image) {
              draft.display.image.current = current;
            }
          })
        );
      }}
    />
  );
}
