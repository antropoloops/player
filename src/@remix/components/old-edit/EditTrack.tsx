import React from "react";
import { safeFindTrackById } from "../../../audioset";
import { mutateTrack } from "../../helpers/immutableHelpers";
import InlineEdit from "../inline/InlineEdit";
import { EditorProps } from "./Editor";

const EditTrack: React.FC<EditorProps> = ({ audioset, id, onChange }) => {
  const track = safeFindTrackById(audioset, id);
  if (!track) return <div>Algo ha ido mal...</div>;

  return (
    <div className="text-white">
      <h2>Editar pista</h2>

      <InlineEdit
        value={track.name}
        render={(value) => <h1 className="text-4xl">{value}</h1>}
        onChange={(value) => {
          onChange(
            mutateTrack(audioset, track.id, (track) => {
              track.name = value;
            })
          );
        }}
      />
      <pre className="invisible text-sm">{JSON.stringify(track, null, 2)}</pre>
    </div>
  );
};
export default EditTrack;
