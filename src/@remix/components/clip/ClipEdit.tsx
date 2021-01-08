import { DataStore } from "aws-amplify";
import React from "react";
import { useHistory } from "react-router-dom";
import { Heading } from "../../../@core/components";
import { Clip, ClipMetadata } from "../../../models";
import routes from "../../../routes";
import { RemixEditProps } from "../../contexts/RemixContext";
import RemixNavigation from "../remix/RemixNavigation";
import ClipForm from "./ClipForm";

export default function ClipEdit({
  remix,
  clips,
  tracks,
  clipId,
}: RemixEditProps & { clipId: string }) {
  const history = useHistory();
  const clip = clips?.find((c) => c.id === clipId);
  const track = clip && tracks?.find((t) => t.id === clip.trackID);

  const saveClip = async (data: ClipMetadata) => {
    if (!clip) return;

    await DataStore.save(
      Clip.copyOf(clip, (draft) => {
        draft.meta = { ...draft.meta, ...data };
      })
    );
    history.push(routes.remixClip(remix.id, clipId));
  };

  return (
    <div>
      <RemixNavigation
        remix={remix}
        track={track}
        clip={clip}
        current="Propiedades"
      />
      <Heading level={1}>Editar clip</Heading>
      <ClipForm
        className="my-4"
        clip={clip?.meta}
        onSubmit={saveClip}
        onCancel={() => {
          history.push(routes.remixClip(remix.id, clipId));
        }}
      />
    </div>
  );
}
