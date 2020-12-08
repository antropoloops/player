import React from "react";
import { EditorProps } from "./Editor";
import { mutateClip } from "../../helpers/immutableHelpers";
import routes from "../../../routes";
import { safeFindClipById } from "../../../audioset";
import { Link } from "react-router-dom";
import UploadMediaInput from "../../../@archive/components/UploadMediaInput";
import { useOfflineMediaFileQuery } from "../../../@archive/hooks/useOfflineMediaQueries";
import IconButton from "../../../components/shared/IconButton";
import { RemoveCircleIcon } from "../../../components/icons/Icons";
import useAudioBuffer from "../../../@archive/hooks/useAudioBuffer";
import PreviewAudio from "../../../@archive/components/PreviewAudio";

export const EditClipAudio: React.FC<EditorProps> = ({
  audioset,
  id,
  onChange,
}) => {
  const clip = safeFindClipById(audioset, id);

  const storage = clip?.resources.audio.storage;
  const { data: file } = useOfflineMediaFileQuery(storage?.offlineId);
  const { buffer } = useAudioBuffer(file?.data.blob);

  if (!clip) return <div>Clip no encontrado</div>;

  if (!storage?.offlineId) {
    return (
      <div className="text-white">
        <h1>Añadir sonido</h1>
        <div className="py-4">
          <UploadMediaInput
            bgColor=""
            style={{ backgroundColor: clip.color }}
            onChange={(files) => {
              const file = files[0];
              onChange(
                mutateClip(audioset, id, (clip) => {
                  clip.resources.audio.wav = "";
                  clip.resources.audio.storage = {
                    offlineId: file.mediaFile.id,
                    fileName: file.mediaFile.name,
                    mimeType: file.mediaFile.mimeType,
                    waveform: file.mediaFile.thumbnail || "",
                    duration: 0,
                    region: {
                      offset: 0,
                    },
                  };
                })
              );
            }}
          >
            Subir audio
          </UploadMediaInput>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h1>Editar sonido</h1>
      <Link to={routes.remixEditItemChild(audioset.id, "clip", clip.id)}>
        <h2 className="text-2xl" style={{ color: clip.color }}>
          {clip.name}
        </h2>
      </Link>
      <PreviewAudio
        noAudioLoad
        storage={storage}
        buffer={buffer}
        color={clip.color}
      />
      <IconButton
        textColor="text-red-900"
        icon={RemoveCircleIcon}
        onClick={() => {
          onChange(
            mutateClip(audioset, id, (clip) => {
              clip.resources.audio.wav = "";
              clip.resources.audio.storage = undefined;
            })
          );
        }}
      >
        Borrar
      </IconButton>
    </div>
  );
};
