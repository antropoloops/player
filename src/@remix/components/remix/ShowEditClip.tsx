import { DataStore } from "aws-amplify";
import React from "react";
import { useHistory } from "react-router-dom";
import { DesktopView, Title } from "../../../@core/components";
import BackToLink from "../../../components/BackToLink";
import { Group, Media, Project, Clip, Track } from "../../../models";
import routes from "../../../routes";
import SamplePreview from "../SamplePreview";
import DeleteAction from "../shared/DeleteAction";
import CoverPreview from "../media/CoverPreview";
import FilesInput from "../shared/FilesInput";
import { imageUploader } from "../../services/imageUploader";
import { useObserveModel } from "../../../@backend/hooks/useObserveModel";
import ActionButton from "../shared/ActionButton";
import ActionLink from "../shared/ActionLink";
import { CloudUploadIcon, EditIcon } from "../../../components/icons/Icons";

type Props = {
  className?: string;
  group: Group;
  remix: Project;
  tracks: Track[];
  clip: Clip;
  files: Media[];
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
  files,
}: Props) {
  const history = useHistory();
  const track = tracks.find((t) => t.id === clip.trackID);

  // @meta
  const title = clip.meta?.title;

  const uploadImage = async (file: File) => {
    // FIXME
    // const uploader = imageUploader(group, remix, track, clip.id);
    // const cover = await uploader(file);
    // await DataStore.save(
    //   Clip.copyOf(clip, (draft) => {
    //     draft.coverID = cover.id;
    //   })
    // );
    // return cover.id;
    return "";
  };

  return (
    <DesktopView>
      {track && (
        <BackToLink to={routes.remixTrack(remix.id, track.id)}>
          {track.meta.name}
        </BackToLink>
      )}
      <Title level={1}>{title}</Title>

      <CoverPreview cover={clip} className="my-4" />
      <div className="flex">
        {clip.imageID && (
          <ActionLink
            to={routes.remixCover(remix.id, clip.id)}
            icon={EditIcon}
            smallIcon
          >
            Editar portada
          </ActionLink>
        )}
        <FilesInput
          fileType="image"
          maxFiles={1}
          className="mr-4"
          icon={CloudUploadIcon}
          smallIcon
          uploadFile={uploadImage}
        >
          {clip.imageID ? "Cambiar portada" : "Añadir portada"}
        </FilesInput>
      </div>
      <SamplePreview className="mt-8" sample={clip} track={track} />
      <div className="flex my-4">
        <ActionButton>Editar sonido</ActionButton>
      </div>

      <DeleteAction
        message="Vas a borrar éste sonido, pero la grabación no se borrará."
        onClick={() => {
          if (!track) return;
          deleteClip(clip);
          history.push(
            track
              ? routes.remixTrack(remix.id, track.id)
              : routes.remix(remix.id)
          );
        }}
        smallIcon
      >
        Borrar clip
      </DeleteAction>
      {/* <pre className="mt-4 font-xs">{JSON.stringify(clip, null, 2)}</pre> */}
    </DesktopView>
  );
}
