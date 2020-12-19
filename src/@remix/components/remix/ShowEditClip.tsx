import { DataStore } from "aws-amplify";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { DesktopView } from "../../../@core/components";
import BackToLink from "../../../components/BackToLink";
import { DeleteIcon } from "../../../components/icons/Icons";
import { Group, Project, Selection, Track } from "../../../models";
import routes from "../../../routes";
import SamplePreview from "../SamplePreview";
import ActionButton from "../shared/ActionButton";

type Props = {
  className?: string;
  group: Group;
  remix: Project;
  tracks: Track[];
  sample: Selection;
};

const deleteClip = async (track: Track, sample: Selection) => {
  await DataStore.save(
    Track.copyOf(track, (draft) => {
      draft.clips = draft.clips.filter((x) => x.selectionID !== sample.id);
    })
  );
  await DataStore.delete(sample);
};

export default function ShowEditClip({
  className,
  group,
  remix,
  tracks,
  sample,
}: Props) {
  const history = useHistory();
  const { clip, track } = useMemo(() => {
    for (const track of tracks) {
      const clip = track.clips.find((clip) => clip.selectionID === sample.id);
      if (clip) return { clip, track };
    }
    return {};
  }, [tracks, sample.id]);

  const thumbnail = sample.file?.thumbnail || sample.media?.file.thumbnail;

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
            deleteClip(track, sample);
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
    </DesktopView>
  );
}
