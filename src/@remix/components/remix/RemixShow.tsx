import { DataStore, Group, Project, Track } from "../../../@backend/datastore";
import { Heading } from "../../../@core/components";
import { AddIcon, EditIcon } from "../../../components/icons/Icons";
import { RemixProperties } from "./RemixProperties";
import ActionButton from "../shared/ActionButton";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import { randomColor } from "../../helpers/colorHelpers";
import DeleteAction from "../shared/DeleteAction";
import ShowEditImage from "../image/ShowEditImage";
import { imageUploader } from "../../services/imageUploader";
import { RemixEditProps } from "../../contexts/RemixContext";
import RemixNavigation from "./RemixNavigation";
import ActionLink from "../shared/ActionLink";

async function deleteRemix(remix: Project) {
  return DataStore.delete(remix);
}

const uploadCover = async (group: Group, remix: Project, file: File) => {
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
async function uploadBackground(group: Group, remix: Project, file: File) {
  const uploader = imageUploader(group, remix);
  const image = await uploader(file);
  await DataStore.save(
    Project.copyOf(remix, (draft) => {
      const editableImage = {
        original: {
          mediaID: image.id,
          file: image.file,
        },
        current: {
          file: image.file,
          crop: {},
        },
      };
      draft.display = {
        image: editableImage,
      };
    })
  );
  return remix.id;
}

export default function RemixShow({
  remix,
  group,
  tracks,
  clips,
}: RemixEditProps) {
  const history = useHistory();

  if (!remix) return null;

  const trackCount = tracks?.length || 0;
  const clipCount = clips?.length || 0;

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
    <div>
      <RemixNavigation current="Remezcla" />
      <Heading level={1} className="mb-8">
        {remix.meta.title}
      </Heading>

      <RemixProperties className="my-8" remix={remix} />
      <div className="flex">
        <ActionLink
          className="mr-4"
          to={routes.remixEdit(remix.id)}
          icon={EditIcon}
          smallIcon
        >
          Editar
        </ActionLink>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:mr-4">
          <Heading className="mt-8 mb-4" level={2}>
            Portada
          </Heading>
          <ShowEditImage
            aspect="16:9"
            editableImage={remix.image}
            editPath={routes.remixCover(remix.id)}
            uploadCover={(file) => uploadCover(group, remix, file)}
          />
        </div>
        <div>
          <Heading className="mt-8 mb-4" level={2}>
            Fondo
          </Heading>
          <ShowEditImage
            aspect="16:9"
            editableImage={remix.display?.image}
            editPath={routes.remixEditBackground(remix.id)}
            uploadCover={(file) => uploadBackground(group, remix, file)}
          />
        </div>
      </div>

      <Heading className="mt-8 mb-4" level={2}>
        Pistas
      </Heading>
      <div className="flex">
        <ActionButton
          className="mr-4 bg-remixes"
          icon={AddIcon}
          onClick={addTrack}
        >
          Añadir pista
        </ActionButton>
      </div>
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
      {/* <pre className="text-sm">
        {JSON.stringify({ remix, tracks, clips }, null, 2)}
      </pre> */}
    </div>
  );
}
