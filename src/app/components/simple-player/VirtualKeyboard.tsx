import React, { useState } from "react";
import cc from "classcat";
import { Audioset, Clip } from "../../../audioset";
import { KeyboardController } from "../../../player/Control";
import ClipKeyBinding from "./ClipKeyBinding";

type Props = {
  audioset: Audioset;
  keyboard: KeyboardController;
};

type Row = {
  id: number;
  items: Array<Clip | null>;
};

const MAX_LENGTH = 12;
const SPACERS = Array.from({ length: MAX_LENGTH }).map(() => null);

const VirtualKeyboard: React.FC<Props> = ({ audioset, keyboard }) => {
  const [isRemapActive, setRemapActive] = useState(false);
  const { clips } = audioset;
  const rowCount = Math.floor(clips.length / MAX_LENGTH) + 1;

  const rows = Array.from({ length: rowCount }).map(
    (_, id): Row => ({
      id,
      items: clips.slice(id * MAX_LENGTH, id * MAX_LENGTH + 12),
    })
  );
  const spacerCount = Math.floor((clips.length % MAX_LENGTH) / 2);

  const lastRow = rows[rows.length - 1];
  lastRow.items = [
    ...SPACERS.slice(0, spacerCount),
    ...lastRow.items.slice(0, MAX_LENGTH - spacerCount),
  ];

  return (
    <div className="flex flex-col">
      {rows.map((row) => (
        <div key={row.id} className="grid grid-cols-12">
          {row.items.map((clip, index) =>
            !clip ? (
              <div key={index} />
            ) : isRemapActive ? (
              <ClipKeyBinding
                className="m-2"
                key={clip.id}
                clipId={clip.id}
                keyboard={keyboard}
              />
            ) : (
              <VirtualKey
                clipKey={keyboard.getKey(clip.id)}
                color={clip.color}
                keyboard={keyboard}
              />
            )
          )}
        </div>
      ))}
      <div className="mb-1">
        <button
          className={cc([
            "px-2 px-1 text-xs rounded-full bg-gray-medium text-white",
            "focus:outline-none",
            isRemapActive && "text-green",
          ])}
          onClick={() => setRemapActive(!isRemapActive)}
        >
          remap
        </button>
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
    className="w-8 h-8 rounded-full m-2 focus:outline-none"
    style={{ backgroundColor: color }}
    onMouseDown={() => keyboard.keyDown(clipKey)}
    onMouseUp={() => keyboard.keyUp(clipKey)}
  >
    {clipKey}
  </button>
);
