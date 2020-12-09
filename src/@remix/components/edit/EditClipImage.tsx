import React from "react";
import { EditorProps } from "./Editor";
import ImageCropInput from "../inline/ImageCropInput";
import { FileInput } from "../inline/FileInput";
import { mutateClip } from "../../helpers/immutableHelpers";
import IconLink from "../../../components/shared/IconLink";
import { CheckIcon, CloseIcon } from "../../../components/icons/Icons";
import routes from "../../../routes";
import { IconButton } from "../../../components/shared/IconButton";
import ImagePlaceholder from "../shared/ImagePlaceholder";
import { safeFindClipById } from "../../../audioset";
import { useHistory } from "react-router-dom";

const EditClipImage: React.FC<EditorProps> = ({ audioset, id, onChange }) => {
  const history = useHistory();
  const clip = safeFindClipById(audioset, id);

  if (!clip) return <div>Clip no encontrado</div>;

  const url = clip.resources.cover.small;
  return (
    <div>
      {url ? (
        <ImageCropInput storageKey={url} aspect={1} />
      ) : (
        <ImagePlaceholder className="w-full" />
      )}
      <div className="flex">
        <div className="flex items-center flex-grow">
          <IconButton
            icon={CheckIcon}
            onClick={() => {
              history.push(
                routes.remixEditItemChild(audioset.id, "clip", clip.id)
              );
            }}
          >
            Guardar
          </IconButton>
          <IconLink
            icon={CloseIcon}
            to={routes.remixEditItemChild(audioset.id, "clip", clip.id)}
          >
            Cancelar
          </IconLink>
        </div>
        <FileInput
          value=""
          onChange={(storageKey) => {
            onChange(
              mutateClip(audioset, clip.id, (clip) => {
                clip.resources.cover.small = storageKey;
              })
            );
          }}
          parentKey={`audioset-${audioset.id}`}
          accept={["image/*"]}
        >
          {url ? "Cambiar imágen" : "Subir imágen"}
        </FileInput>
      </div>
    </div>
  );
};
export default EditClipImage;
