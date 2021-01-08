import { EditableAudio } from "../../../models";
import AudioPreview from "./AudioPreview";
import classcat from "classcat";
import { CloudUploadIcon, EditIcon } from "../../../components/icons/Icons";
import FilesInput from "../shared/FilesInput";
import ActionLink from "../shared/ActionLink";

type Props = {
  className?: string;
  editPath: string;
  editableSound?: EditableAudio;
  color: string;
  uploadAudio: (file: File) => Promise<string>;
};

export default function ShowEditAudio({
  className,
  editableSound,
  editPath,
  color,
  uploadAudio,
}: Props) {
  const current = editableSound?.current;

  return (
    <div className={classcat(["flex flex-col", className])}>
      <AudioPreview file={current?.file} color={color} />
      <div className="flex my-4">
        {current && (
          <ActionLink to={editPath} icon={EditIcon} smallIcon>
            Editar sonido
          </ActionLink>
        )}
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
