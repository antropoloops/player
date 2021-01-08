import React from "react";
import { EditableImage } from "../../../models";
import ImagePreview from "./ImagePreview";
import { CloudUploadIcon, EditIcon } from "../../../components/icons/Icons";
import ActionLink from "../shared/ActionLink";
import FilesInput from "../shared/FilesInput";
import { useHistory } from "react-router-dom";

type Props = {
  className?: string;
  uploadCover: (file: File) => Promise<string>;
  editableImage?: EditableImage;
  editPath: string;
  aspect: "1" | "16:9";
};

export default function ImageShow({
  className,
  aspect,
  uploadCover,
  editableImage,
  editPath,
}: Props) {
  const history = useHistory();
  const current = editableImage?.current;

  return (
    <div className={className}>
      <ImagePreview
        aspect={aspect}
        imageFile={current?.file}
        className="my-4"
      />
      <div className="flex">
        {current && (
          <ActionLink to={editPath} icon={EditIcon} smallIcon>
            Editar imágen
          </ActionLink>
        )}
        <FilesInput
          fileType="image"
          maxFiles={1}
          className="mr-4"
          icon={CloudUploadIcon}
          smallIcon
          uploadFile={async (file) => {
            const id = await uploadCover(file);
            history.push(editPath);
            return id;
          }}
        >
          {current ? "Cambiar imágen" : "Añadir imágen"}
        </FilesInput>
      </div>
    </div>
  );
}
