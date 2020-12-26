import { DataStore } from "aws-amplify";
import React from "react";
import { useHistory } from "react-router-dom";
import { DesktopView, Title } from "../../../@core/components";
import BackToLink from "../../../components/BackToLink";
import { Group, Project, Clip, Track } from "../../../models";
import routes from "../../../routes";
import SamplePreview from "../SamplePreview";
import DeleteAction from "../shared/DeleteAction";
import FilesInput from "../shared/FilesInput";
import { imageUploader } from "../../services/imageUploader";
import ActionButton from "../shared/ActionButton";
import { CloudUploadIcon } from "../../../components/icons/Icons";
import { audioUploader } from "../../services/audioUploader";
import useSimpleAudioContext from "../../hooks/useSimpleAudioContext";
import ShowEditImage from "../image/ShowEditImage";

type Props = {
  className?: string;
  group: Group;
  remix: Project;
  tracks: Track[];
  clip: Clip;
};

const deleteClip = async (clip: Clip) => {
  await DataStore.delete(clip);
};

export default function ShowEditClip({
  className,
  group,
  remix,
  tracks,
  clip,
}: Props) {
  const history = useHistory();
  const ctx = useSimpleAudioContext();

  const track = tracks.find((t) => t.id === clip.trackID);
  const title = clip.meta.name;

  const uploadCover = async (file: File) => {
    const uploader = imageUploader(group, remix);
    const image = await uploader(file);
    await DataStore.save(
      Clip.copyOf(clip, (draft) => {
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
    return clip.id;
  };

  const uploadSample = async (file: File) => {
    const uploader = audioUploader(ctx, group, remix);
    const audio = await uploader(file);
    await DataStore.save(
      Clip.copyOf(clip, (draft) => {
        draft.audio = {
          original: {
            mediaID: audio.id,
            file: audio.file,
          },
          current: {
            file: audio.file,
            region: {
              offset: 0,
              duration: audio.file.duration || 0,
            },
          },
        };
      })
    );
    return clip.id;
  };

  return (
    <DesktopView>
      {track && (
        <BackToLink to={routes.remixTrack(remix.id, track.id)}>
          {track.meta.name}
        </BackToLink>
      )}
      <Title level={1}>{title}</Title>

      <ShowEditImage
        aspect="1"
        editableImage={clip.image}
        uploadCover={uploadCover}
        editPath={routes.remixCover(remix.id, clip.id)}
      />

      <SamplePreview className="mt-8" clip={clip} track={track} />
      <div className="flex my-4">
        {clip.audio && <ActionButton>Editar sonido</ActionButton>}
        <FilesInput
          fileType="audio"
          maxFiles={1}
          className="mr-4"
          icon={CloudUploadIcon}
          smallIcon
          uploadFile={uploadSample}
        >
          {clip.audio ? "Cambiar sonido" : "Añadir sonido"}
        </FilesInput>
      </div>

      <DeleteAction
        message="Vas a borrar éste clip."
        onClick={() => {
          if (!track) return;
          deleteClip(clip);
          history.push(
            track
              ? routes.remixTrack(remix.id, track.id)
              : routes.remix(remix.id)
          );
        }}
      >
        Borrar clip
      </DeleteAction>
      {/* <pre className="mt-4 font-xs">{JSON.stringify(clip, null, 2)}</pre> */}
    </DesktopView>
  );
}
