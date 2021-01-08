import React, { useState } from "react";
import { DataStore, Project, Track } from "../../../@backend/datastore";
import { DesktopView, Heading } from "../../../@core/components";
import { AddIcon, EditIcon } from "../../../components/icons/Icons";
import { RemixProperties } from "./RemixProperties";
import RemixForm from "./RemixForm";
import ActionButton from "../shared/ActionButton";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import { randomColor } from "../../helpers/colorHelpers";
import BackToLink from "../../../components/BackToLink";
import DeleteAction from "../shared/DeleteAction";
import ShowEditImage from "../image/ShowEditImage";
import { imageUploader } from "../../services/imageUploader";
import { RemixContextValue } from "../../contexts/RemixContext";

async function deleteRemix(remix: Project) {
  return DataStore.delete(remix);
}

export default function ShowEditRemix({
  remix,
  group,
  tracks,
  clips,
}: RemixContextValue) {
  const history = useHistory();
  const [edit, setEdit] = useState(false);

  if (!remix) return null;

  const trackCount = tracks?.length || 0;
  const clipCount = clips?.length || 0;

  const uploadCover = async (file: File) => {
    const uploader = imageUploader(group, remix);
    const image = await uploader(file);
    await DataStore.save(
      Project.copyOf(remix, (draft) => {
        draft.image = {
          original: {
            mediaID: image.id,
            file: image.file,
          },
          current: {
            file: image.file,
            crop: {},
          },
        };
      })
    );
    return remix.id;
  };

  const addTrack = async () => {
    const track = await DataStore.save(
      new Track({
        groupID: group.id,
        projectID: remix.id,
        meta: {
          name: "Pista-" + (trackCount + 1),
          volume: 1,
          position: trackCount,
          color: randomColor(),
        },
      })
    );
    history.push(routes.remixTrack(remix.id, track.id));
  };

  return (
    <DesktopView>
      <BackToLink label="Remezclas" to={routes.remixes()} />
      <Heading level={1} className="mb-8">
        {remix.meta.title}
      </Heading>

      {edit ? (
        <RemixForm
          remix={remix}
          className="max-w-2xl"
          onSubmit={(data) => {
            // console.log("data", data);
            // setEdit(false);
            DataStore.save(
              Project.copyOf(remix, (draft) => {
                draft.meta = data.meta;
                draft.remix = data.remix;
              })
            ).then(() => setEdit(false));
          }}
          onCancel={() => setEdit(false)}
        />
      ) : (
        <>
          <RemixProperties className="my-8" remix={remix} />
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
            <ActionButton className="mr-4" icon={AddIcon} onClick={addTrack}>
              Añadir pista
            </ActionButton>
          </div>
          <ShowEditImage
            editableImage={remix.image}
            editPath={routes.remixCover(remix.id)}
            uploadCover={uploadCover}
            aspect="16:9"
          />
          <DeleteAction
            disabled={
              clipCount || trackCount
                ? "No se puede borrar porque no está vacío"
                : ""
            }
            message="Vas a borrar ésta remezcla"
            onClick={() => {
              deleteRemix(remix).then(() => {
                history.push(routes.remixes());
              });
            }}
          >
            Borrar remezcla
          </DeleteAction>
        </>
      )}
      {/* <pre className="text-sm">
        {JSON.stringify({ remix, tracks, clips }, null, 2)}
      </pre> */}
    </DesktopView>
  );
}
