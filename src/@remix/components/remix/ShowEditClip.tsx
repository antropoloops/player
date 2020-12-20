import { DataStore } from "aws-amplify";
import React from "react";
import { useHistory } from "react-router-dom";
import { DesktopView, Title } from "../../../@core/components";
import BackToLink from "../../../components/BackToLink";
import { Group, Media, Project, Selection, Track } from "../../../models";
import routes from "../../../routes";
import SamplePreview from "../SamplePreview";
import DeleteAction from "../shared/DeleteAction";
import ImagePreview from "../media/ImagePreview";
import ActionButton from "../shared/ActionButton";
import FilesInput from "../shared/FilesInput";
import { imageUploader } from "../../services/imageUploader";
import {
  useObserveList,
  useObserveModel,
} from "../../../@backend/hooks/useObserveModel";

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
  const { data: images } = useObserveList(Selection, (s) =>
    s.parentID("eq", sample.id)
  );

  const title = sample.meta?.title || sample.media?.meta?.title;

  const uploadImage = async (file: File) => {
    const uploader = imageUploader(group, remix, track, sample.id);
    const image = await uploader(file);
    return image.id;
  };

  return (
    <DesktopView>
      {track && (
        <BackToLink to={routes.remixTrack(remix.id, track.id)}>
          {track.meta.name}
        </BackToLink>
      )}
      <Title level={1}>{title}</Title>

      <SamplePreview sample={sample} track={track} />
      <ImagePreview images={images} className="my-4">
        <FilesInput
          fileType="image"
          maxFiles={1}
          className="mr-4"
          colors="bg-remixes text-black"
          bgColor={track?.meta.color}
          uploadFile={uploadImage}
        >
          Añadir imágen
        </FilesInput>
      </ImagePreview>

      <DeleteAction
        message="Vas a borrar éste sonido, pero la grabación no se borrará."
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
      </DeleteAction>
      {/* <pre className="mt-4 font-xs">{JSON.stringify(sample, null, 2)}</pre> */}
    </DesktopView>
  );
}
