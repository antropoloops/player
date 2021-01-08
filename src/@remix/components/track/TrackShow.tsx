import React, { useState } from "react";
import {
  Track,
  Clip,
  DataStore,
  TrackMetadata,
} from "../../../@backend/datastore";
import { Heading } from "../../../@core/components";
import TrackProperties from "./TrackProperties";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import { ActionButton } from "../shared/ActionButton";
import { EditIcon } from "../../../components/icons/Icons";
import RemixNavigation from "../remix/RemixNavigation";
import { RemixEditProps } from "../../contexts/RemixContext";
import ActionLink from "../shared/ActionLink";

export default function TrackShow({
  remix,
  group,
  tracks,
  trackId,
  clips,
}: RemixEditProps & { trackId: string }) {
  const history = useHistory();

  const track = tracks?.find((t) => t.id === trackId);
  if (!track) return null;

  const addNewClip = async () => {
    const clip = await DataStore.save(
      new Clip({
        groupID: group.id,
        projectID: remix.id,
        trackID: track.id,
        meta: {
          name: "Clip sin título",
        },
      })
    );
    history.push(routes.remixClipEdit(remix.id, clip.id));
  };

  return (
    <div>
      <RemixNavigation remix={remix} current="Pista" />
      <Heading level={1} className="mb-8 p-4 -ml-4">
        {track.meta.name}
      </Heading>
      <TrackProperties className="my-8" track={track} />
      <div className="flex">
        <ActionLink
          className="mr-4"
          icon={EditIcon}
          smallIcon
          to={routes.remixTrackEdit(remix.id, track.id)}
        >
          Editar
        </ActionLink>
        <ActionButton onClick={addNewClip}>Añadir clip</ActionButton>
      </div>

      {/* <pre>{JSON.stringify(track, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(clips, null, 2)}</pre> */}
    </div>
  );
}
