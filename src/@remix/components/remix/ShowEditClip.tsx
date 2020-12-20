import { DataStore } from "aws-amplify";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { DesktopView } from "../../../@core/components";
import BackToLink from "../../../components/BackToLink";
import { DeleteIcon } from "../../../components/icons/Icons";
import { Group, Media, Project, Selection, Track } from "../../../models";
import routes from "../../../routes";
import SamplePreview from "../SamplePreview";
import ActionButton from "../shared/ActionButton";

type Props = {
  className?: string;
  group: Group;
  remix: Project;
  tracks: Track[];
  sample: Selection;
  sounds: Media[];
};

const deleteClip = async (sample: Selection) => {
  await DataStore.delete(sample);
};

export default function ShowEditClip({
  className,
  group,
  remix,
  tracks,
  sample,
  sounds,
}: Props) {
  const history = useHistory();
  const track = tracks.find((t) => t.id === sample.trackID);

  return (
    <DesktopView>
      {track && (
        <BackToLink to={routes.remixTrack(remix.id, track.id)}>
          {track.meta.name}
        </BackToLink>
      )}

      <SamplePreview sample={sample} track={track} />

      <div className="flex py-4">
        <ActionButton
          icon={DeleteIcon}
          colors="bg-transparent"
          onClick={() => {
            if (!track) return;
            deleteClip(sample);
            history.push(
              track
                ? routes.remixTrack(remix.id, track.id)
                : routes.remix(remix.id)
            );
          }}
          smallIcon
        >
          Borrar sonido
        </ActionButton>
      </div>
      <pre className="mt-4 font-xs">{JSON.stringify(sample, null, 2)}</pre>
    </DesktopView>
  );
}
