import React, { useState } from "react";

import {
  Group,
  Project,
  Track,
  Clip,
  DataStore,
  TrackMetadata,
} from "../../../@backend/datastore";
import { DesktopView, Heading } from "../../../@core/components";
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
  selections: Clip[];
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

  const saveTrack = async (data: TrackMetadata) => {
    await DataStore.save(
      Track.copyOf(track, (draft) => {
        draft.meta = data;
      })
    );
    setEdit(false);
  };

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
    history.push(routes.remixClip(remix.id, clip.id));
  };

  const deleteTrack = async () => {
    await DataStore.delete(Track, track.id);
    history.push(routes.remix(remix.id));
  };

  const samples = selections.filter((s) => s.trackID === track.id);

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
            {/* <FilesInput
              fileType="audio"
              maxFiles={1}
              className="mr-4"
              colors="bg-remixes text-black"
              bgColor={track.meta.color}
              onChange={onChange}
              uploadFile={uploadFile}
            >
              Subir sonido
            </FilesInput> */}
            <ActionButton onClick={addNewClip}>Añadir clip</ActionButton>
            {samples.length === 0 && (
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
            {samples.map((sample) => {
              const name = sample.meta.name;
              const thumbnail = sample.audio?.current.file?.thumbnail;
              return (
                <Link
                  key={sample.id}
                  to={routes.remixClip(remix.id, sample.id)}
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
