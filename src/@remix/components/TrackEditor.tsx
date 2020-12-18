import React, { useEffect } from "react";

import { Group, Project, Track } from "../../@backend/datastore";
import { DesktopView, Heading } from "../../@core/components";
import { FilesInput } from "../../@archive/components/FilesInput";
import { updateTrack } from "../service";
import { useListTrackSamplesQuery } from "../hooks/useRemixQueries";
import { imageUploader } from "../services/imageUploader";
import { Waveform } from "../../@sounds/components/Waveform";
import TrackProperties from "./TrackProperties";
import { Link } from "react-router-dom";
import routes from "../../routes";

type Props = {
  group: Group;
  remix: Project;
  track?: Track;
  onChange: () => void;
};

export function TrackEditor({ remix, group, track, onChange }: Props) {
  const project = {
    groupId: remix.groupID,
    projectId: remix.id,
  };
  const { data: selections, refetch } = useListTrackSamplesQuery(
    project,
    track
  );

  useEffect(() => {}, []);

  if (!track) return null;

  const uploadFile = async (file: File) => {
    const selection = await imageUploader(remix, group)(file);
    await updateTrack(track, {
      clips: [...track.clips, { selectionID: selection.id }],
    });
    return selection.id;
  };

  return (
    <DesktopView>
      <Heading level={1}>{track.meta.name}</Heading>
      <TrackProperties className="my-8" track={track} />
      <FilesInput
        colors="bg-remixes text-black"
        onChange={onChange}
        uploadFile={uploadFile}
      >
        Subir sonidos
      </FilesInput>

      <div className="mt-16">
        {selections?.map((selection) => {
          const name = selection.media?.meta.title;
          const thumbnail = selection.media?.file.thumbnail;
          return (
            <Link
              key={selection.id}
              to={routes.remixEditItemChild(remix.id, "s", selection.id)}
            >
              <Heading className="mt-4" level={4}>
                {name}
              </Heading>
              {thumbnail && (
                <div className="mt-1 p-1 bg-gray-darker text-remixes opacity-75">
                  <Waveform width={100} height={10} points={thumbnail} />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* <pre>{JSON.stringify(track, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(selections, null, 2)}</pre> */}
    </DesktopView>
  );
}
