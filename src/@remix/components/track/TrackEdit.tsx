import { DataStore } from "aws-amplify";
import React from "react";
import { useHistory } from "react-router-dom";
import { Heading } from "../../../@core/components";
import { Track, TrackMetadata } from "../../../models";
import routes from "../../../routes";
import { RemixEditProps } from "../../contexts/RemixContext";
import RemixNavigation from "../remix/RemixNavigation";
import TrackForm from "./TrackForm";

export default function TrackEdit({
  remix,
  clips,
  tracks,
  trackId,
}: RemixEditProps & { trackId: string }) {
  const history = useHistory();
  const track = tracks?.find((t) => t.id === trackId);

  const saveTrack = async (data: TrackMetadata) => {
    if (!track) return;
    await DataStore.save(
      Track.copyOf(track, (draft) => {
        draft.meta = data;
      })
    );
    history.push(routes.remixTrack(remix.id, trackId));
  };

  return (
    <div>
      <RemixNavigation remix={remix} track={track} current="Propiedades" />
      <Heading level={1}>Editar clip</Heading>
      <TrackForm
        className="my-4"
        track={track?.meta}
        onSubmit={saveTrack}
        onCancel={() => {
          history.push(routes.remixTrack(remix.id, trackId));
        }}
      />
    </div>
  );
}
