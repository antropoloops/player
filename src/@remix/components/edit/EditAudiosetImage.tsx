import React from "react";
import { EditorProps } from "./Editor";
import ImageCropInput from "../inline/ImageCropInput";
import { FileInput } from "../inline/FileInput";
import { mutateAudioset } from "../../helpers/immutableHelpers";
import IconLink from "../../../components/shared/IconLink";
import { CheckIcon, CloseIcon } from "../../../components/icons/Icons";
import routes from "../../../routes";
import IconButton from "../../../components/shared/IconButton";
import ImagePlaceholder from "../shared/ImagePlaceholder";

type Props = {};

const EditAudiosetImage: React.FC<EditorProps> = ({ audioset, onChange }) => {
  const url = audioset.meta.logo_url;
  return (
    <div>
      {url ? (
        <ImageCropInput storageKey={url} />
      ) : (
        <ImagePlaceholder className="w-full" />
      )}
      <div className="flex">
        <div className="flex items-center flex-grow">
          <IconButton icon={CheckIcon}>Guardar</IconButton>
          <IconLink icon={CloseIcon} to={routes.remixEdit(audioset.id)}>
            Cancelar
          </IconLink>
        </div>
        <FileInput
          value=""
          onChange={(storageKey) => {
            onChange(
              mutateAudioset(audioset, (audioset) => {
                audioset.meta.logo_url = storageKey;
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
export default EditAudiosetImage;
