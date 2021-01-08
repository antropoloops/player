import { EditableAudio } from "../../../models";
import AudioPreview from "./AudioPreview";
import classcat from "classcat";
import { CloudUploadIcon } from "../../../components/icons/Icons";
import FilesInput from "../shared/FilesInput";
import ActionButton from "../shared/ActionButton";

type Props = {
  className?: string;
  editableSound?: EditableAudio;
  color: string;
  uploadAudio: (file: File) => Promise<string>;
};

export default function ShowEditAudio({
  className,
  editableSound,
  color,
  uploadAudio,
}: Props) {
  return (
    <div className={classcat(["flex flex-col", className])}>
      <AudioPreview file={editableSound?.current.file} color={color} />
      <div className="flex my-4">
        {editableSound && <ActionButton>Editar sonido</ActionButton>}
        <FilesInput
          fileType="audio"
          maxFiles={1}
          className="mr-4"
          icon={CloudUploadIcon}
          smallIcon
          uploadFile={uploadAudio}
        >
          {editableSound ? "Cambiar sonido" : "Añadir sonido"}
        </FilesInput>
      </div>
    </div>
  );
}
