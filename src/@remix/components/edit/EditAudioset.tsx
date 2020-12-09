import React from "react";
import { DeleteIcon } from "../../../components/icons/Icons";
import { IconButton } from "../../../components/shared/IconButton";
import routes from "../../../routes";
import { mutateAudioset } from "../../helpers/immutableHelpers";
import { useStorageImage } from "../../hooks/useStorage";
import EditLink from "../inline/EditLink";
import InlineEdit from "../inline/InlineEdit";
import { EditorProps } from "./Editor";

const EditAudioset: React.FC<EditorProps> = ({ audioset, onChange }) => {
  const { image } = useStorageImage(audioset.meta.logo_url);
  return (
    <div className="text-white">
      <h2>Remezcla</h2>
      <InlineEdit
        label="Nombre"
        value={audioset.meta.title}
        render={(value) => <h1 className="text-4xl">{value}</h1>}
        onChange={(value) => {
          onChange(
            mutateAudioset(audioset, (audioset) => {
              audioset.meta.title = value;
            })
          );
        }}
      />
      <InlineEdit
        value={"" + audioset.audio.bpm}
        render={(value) => <div>bpm: {value}</div>}
        onChange={(value) => {}}
      />

      <div className="mt-4">
        <div className="flex">
          <h2 className="font-medium">Imágen</h2>
          <EditLink to={routes.remixEditItem(audioset.id, "logo")} />
        </div>
        {image && <img className="max-w-sm" src={image.src} alt="" />}
      </div>
      <pre className="hidden text-sm">{JSON.stringify(audioset, null, 2)}</pre>
      <div className="flex py-4 text-white">
        <IconButton
          size="medium"
          iconColor="text-alert"
          bg="none"
          icon={DeleteIcon}
        >
          Borrar remezcla
        </IconButton>
      </div>
    </div>
  );
};
export default EditAudioset;
