import { DataStore } from "aws-amplify";
import React from "react";
import { useHistory } from "react-router-dom";
import { DesktopView, Title } from "../../../@core/components";
import { Clip } from "../../../models";
import routes from "../../../routes";
import DeleteAction from "../shared/DeleteAction";
import { imageUploader } from "../../services/imageUploader";
import { audioUploader } from "../../services/audioUploader";
import useSimpleAudioContext from "../../hooks/useSimpleAudioContext";
import ShowEditImage from "../image/ImageShow";
import AudioShow from "../audio/AudioShow";
import { RemixEditProps } from "../../contexts/RemixContext";
import RemixNavigation from "../remix/RemixNavigation";

const deleteClip = async (clip: Clip) => {
  await DataStore.delete(clip);
};

export default function ClipShow({
  clipId,
  group,
  remix,
  tracks,
  clips,
}: RemixEditProps & { clipId: string }) {
  const history = useHistory();
  const ctx = useSimpleAudioContext();

  const clip = clips?.find((clip) => clip.id === clipId);

  if (!remix || !clip) return null;

  const track = tracks?.find((t) => t.id === clip.trackID);
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
      <RemixNavigation remix={remix} track={track} current="Clip" />
      <Title level={1}>{title}</Title>

      <ShowEditImage
        aspect="1"
        editableImage={clip.image}
        uploadCover={uploadCover}
        editPath={routes.remixClipCover(remix.id, clip.id)}
      />

      <AudioShow
        className="mt-8"
        editableSound={clip.audio}
        color={track?.meta.color || "white"}
        uploadAudio={uploadSample}
        editPath={routes.remixClipAudio(remix.id, clip.id)}
      />

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
