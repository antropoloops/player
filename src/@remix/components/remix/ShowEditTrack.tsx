import React, { useState } from "react";

import {
  Group,
  Project,
  Track,
  Selection,
  DataStore,
  TrackMetadata,
} from "../../../@backend/datastore";
import { DesktopView, Heading } from "../../../@core/components";
import { FilesInput } from "../shared/FilesInput";
import { updateTrack } from "../../service";
import { imageUploader } from "../../services/imageUploader";
import { Waveform } from "../../../@sounds/components/Waveform";
import TrackProperties from "./TrackProperties";
import { Link, useHistory } from "react-router-dom";
import routes from "../../../routes";
import { ActionButton } from "../shared/ActionButton";
import { DeleteIcon, EditIcon } from "../../../components/icons/Icons";
import TrackForm from "./TrackForm";
import BackToLink from "../../../components/BackToLink";

type Props = {
  group: Group;
  remix: Project;
  track?: Track;
  selections?: Selection[];
  onChange: () => void;
};

export default function ShowEditTrack({
  remix,
  group,
  track,
  onChange,
  selections,
}: Props) {
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  if (!track) return null;

  const uploadFile = async (file: File) => {
    const selection = await imageUploader(remix, group)(file);
    await updateTrack(track, {
      clips: [...track.clips, { selectionID: selection.id }],
    });
    return selection.id;
  };

  const saveTrack = async (data: TrackMetadata) => {
    await DataStore.save(
      Track.copyOf(track, (draft) => {
        draft.meta = data;
      })
    );
    setEdit(false);
  };

  const deleteTrack = async () => {
    await DataStore.delete(Track, track.id);
    history.push(routes.remix(remix.id));
  };

  const style = { color: track.meta.color };

  return (
    <DesktopView>
      <BackToLink label="Remezcla" to={routes.remix(remix.id)} />
      <Heading level={1} className="mb-8 p-4 -ml-4">
        {track.meta.name}
      </Heading>
      {edit ? (
        <TrackForm
          className="max-w-2xl"
          track={track.meta}
          onSubmit={saveTrack}
          onCancel={() => setEdit(false)}
        />
      ) : (
        <>
          <TrackProperties className="my-8" track={track} />
          <div className="flex">
            <ActionButton
              className="mr-4"
              icon={EditIcon}
              smallIcon
              onClick={() => {
                setEdit(true);
              }}
            >
              Editar
            </ActionButton>
            <FilesInput
              className="mr-4"
              colors="bg-remixes text-black"
              onChange={onChange}
              uploadFile={uploadFile}
              style={{ backgroundColor: track.meta.color }}
            >
              Subir sonidos
            </FilesInput>
            {track.clips.length === 0 && (
              <ActionButton
                className="mr-4"
                icon={DeleteIcon}
                smallIcon
                onClick={deleteTrack}
              >
                Borrar pista
              </ActionButton>
            )}
          </div>

          <div className="mt-16">
            {track.clips.map((clip) => {
              const selection = selections?.find(
                (s) => s.id === clip.selectionID
              );
              if (!selection) return null;
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
                      <Waveform
                        width={100}
                        height={10}
                        points={thumbnail}
                        style={style}
                      />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* <pre>{JSON.stringify(track, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(selections, null, 2)}</pre> */}
    </DesktopView>
  );
}
