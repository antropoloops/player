import { chunk } from "lodash";
import React, { useState } from "react";
import { Audioset } from "../../audioset";
import { KeyboardController } from "../../player/KeyboardController";
import ClipKeyBinding from "./ClipKeyBinding";
import IconButton from "../shared/IconButton";
import { ReactComponent as CloseIcon } from "../icons/close-24px.svg";
import { ReactComponent as EditIcon } from "../icons/tune-24px.svg";

type Props = {
  audioset: Audioset;
  keyboard: KeyboardController;
  onClose: () => void;
};

const MAX_LENGTH = 12;

const VirtualKeyboard: React.FC<Props> = ({ audioset, keyboard, onClose }) => {
  const [isRemapActive, setRemapActive] = useState(false);
  const { clips } = audioset;

  const rowCount = Math.floor(clips.length / MAX_LENGTH) + 1;
  const chunkSize = Math.floor(clips.length / rowCount) + 1;

  const rows = chunk(clips, chunkSize);

  return (
    <div className="flex flex-col">
      {rows.map((row, index) => (
        <div
          key={index}
          className={`grid grid-cols-${row.length} place-items-center`}
        >
          {row.map((clip, index) =>
            !clip ? (
              <div key={index} />
            ) : isRemapActive ? (
              <ClipKeyBinding
                className="m-2"
                size={12}
                key={clip.id}
                clipId={clip.id}
                keyboard={keyboard}
              />
            ) : (
              <VirtualKey
                key={clip.id}
                clipKey={keyboard.getKey(clip.id)}
                color={clip.color}
                keyboard={keyboard}
              />
            )
          )}
        </div>
      ))}
      <div className="flex">
        <IconButton
          className="mr-1"
          icon={EditIcon}
          onClick={() => setRemapActive(!isRemapActive)}
        >
          {isRemapActive ? "Guardar cambios" : "Cambiar"}
        </IconButton>
        {!isRemapActive && (
          <IconButton icon={CloseIcon} onClick={onClose}>
            Cerrar
          </IconButton>
        )}
      </div>
    </div>
  );
};
export default VirtualKeyboard;

type VirtualKeyProps = {
  clipKey: string;
  color: string;
  keyboard: KeyboardController;
};

const VirtualKey: React.FC<VirtualKeyProps> = ({
  clipKey,
  color,
  keyboard,
}) => (
  <button
    className="w-12 h-12 rounded-full opacity-75 m-2 shadow hover:opacity-100"
    style={{ backgroundColor: color }}
    onMouseDown={() => keyboard.keyDown(clipKey)}
    onMouseUp={() => keyboard.keyUp(clipKey)}
  >
    {clipKey}
  </button>
);
