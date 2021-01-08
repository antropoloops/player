import React from "react";
import { useParams } from "react-router-dom";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import ShowEditRemix from "../components/remix/ShowEditRemix";
import ShowEditTrack from "../components/track/ShowEditTrack";
import ShowEditClip from "../components/clip/ShowEditClip";
import EditClipCover from "../components/clip/EditClipCover";
import { Project, Clip, Track } from "../../models";
import {
  useObserveList,
  useObserveModel,
} from "../../@backend/hooks/useObserveModel";
import EditImage from "../components/image/EditImage";
import routes from "../../routes";
import { DataStore } from "aws-amplify";
import RemixLayout from "../components/RemixLayout";

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

  // const editor =
  //   !group || !remix ? null : params.type === "cover" ? (
  //     <EditImage
  //       group={group}
  //       remix={remix}
  //       aspect={16 / 9}
  //       backTo={routes.remix(remix.id)}
  //       editableImage={remix.image}
  //       saveImage={async (current) => {
  //         return DataStore.save(
  //           Project.copyOf(remix, (draft) => {
  //             if (draft.image) {
  //               draft.image.current = current;
  //             }
  //           })
  //         );
  //       }}
  //     />
  //   ) : params.type === "i" ? (
  //     <EditClipCover group={group} remix={remix} clipId={params.childId} />
  //   ) : sample && params.type === "c" ? (
  //     <ShowEditClip
  //       group={group}
  //       remix={remix}
  //       tracks={tracks}
  //       clip={sample || undefined}
  //     />
  //   ) : track ? (
  //     <ShowEditTrack group={group} remix={remix} track={track} clips={clips} />
  //   ) : (
  //     <ShowEditRemix
  //       group={group}
  //       remix={remix}
  //       tracks={tracks}
  //       samples={clips}
  //     />
  //   );

  return <RemixLayout remixId={params.id}>{null}</RemixLayout>;
}

export default RemixShowPage;
