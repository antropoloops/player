import React from "react";
import { useParams } from "react-router-dom";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import Layout from "../../components/layout/Layout";
import RemixBrowser from "../components/remix/RemixBrowser";
import ShowEditRemix from "../components/remix/ShowEditRemix";
import ShowEditTrack from "../components/remix/ShowEditTrack";
import ShowEditClip from "../components/remix/ShowEditClip";
import EditCover from "../components/clip/EditCover";
import { Project, Clip, Track } from "../../models";
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
  const { data: clips } = useObserveList(Clip, remixId, (t) =>
    t.projectID("eq", params.id)
  );

  const track =
    params.type === "t" && tracks.find((track) => track.id === params.childId);
  const sample = clips.find((track) => track.id === params.childId);

  const editor =
    !group || !remix ? null : params.type === "i" ? (
      <EditCover group={group} remix={remix} clipId={params.childId} />
    ) : sample && params.type === "c" ? (
      <ShowEditClip
        group={group}
        remix={remix}
        tracks={tracks}
        clip={sample || undefined}
      />
    ) : track ? (
      <ShowEditTrack
        group={group}
        remix={remix}
        track={track}
        selections={clips}
        onChange={() => {}}
      />
    ) : (
      <ShowEditRemix
        group={group}
        remix={remix}
        tracks={tracks}
        samples={clips}
      />
    );

  return (
    <Layout nav="projects" desktop={editor}>
      {remix && <RemixBrowser remix={remix} tracks={tracks} clips={clips} />}
    </Layout>
  );
}

export default RemixShowPage;
