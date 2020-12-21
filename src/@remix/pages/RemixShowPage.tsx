import React from "react";
import { useParams } from "react-router-dom";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import Layout from "../../components/layout/Layout";
import RemixBrowser from "../components/remix/RemixBrowser";
import ShowEditRemix from "../components/remix/ShowEditRemix";
import ShowEditTrack from "../components/remix/ShowEditTrack";
import ShowEditClip from "../components/remix/ShowEditClip";
import EditCover from "../components/cover/EditCover";
import { Media, MediaType, Project, Selection, Track } from "../../models";
import {
  useObserveList,
  useObserveModel,
} from "../../@backend/hooks/useObserveModel";

type Params = {
  id: string;
  type?: string;
  childId?: string;
};

type Props = {
  className?: string;
};

export function RemixShowPage({ className }: Props) {
  const params = useParams<Params>();
  const group = useCurrentGroup();

  const remixId = params.id;

  const { data: remix } = useObserveModel(Project, params.id);
  const { data: tracks } = useObserveList(Track, remixId, (t) =>
    t.projectID("eq", params.id)
  );
  const { data: selections } = useObserveList(Selection, remixId, (t) =>
    t.projectID("eq", params.id)
  );
  const { data: files } = useObserveList(Media, remixId, (t) =>
    t.projectID("eq", params.id)
  );

  const clips = selections.filter((s) => s.type === MediaType.RECORDING);
  const covers = selections.filter((s) => s.type === MediaType.IMAGE);

  const track =
    params.type === "t" && tracks.find((track) => track.id === params.childId);
  const sample = selections.find((track) => track.id === params.childId);

  const editor =
    !group || !remix ? null : params.type === "i" ? (
      <EditCover group={group} remix={remix} clipId={params.childId} />
    ) : sample && params.type === "c" ? (
      <ShowEditClip
        group={group}
        remix={remix}
        tracks={tracks}
        sample={sample || undefined}
        files={files}
      />
    ) : track ? (
      <ShowEditTrack
        group={group}
        remix={remix}
        track={track}
        selections={selections}
        onChange={() => {}}
      />
    ) : (
      <ShowEditRemix
        group={group}
        remix={remix}
        tracks={tracks}
        samples={selections}
      />
    );

  return (
    <Layout nav="projects" desktop={editor}>
      {remix && (
        <RemixBrowser
          remix={remix}
          tracks={tracks}
          clips={clips}
          covers={covers}
        />
      )}
    </Layout>
  );
}

export default RemixShowPage;
