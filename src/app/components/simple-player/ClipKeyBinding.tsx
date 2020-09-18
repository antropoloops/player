import React, { useState } from "react";
import classCat from "classcat";
import { KeyboardController } from "../../../player/Control";

type Props = {
  clipId: string;
  keyboard: KeyboardController;
};

const ClipKeyBinding: React.FC<Props> = ({ clipId, keyboard }) => {
  const [isRemapActive, setRemapActive] = useState(false);
  const clipKey = keyboard && keyboard.getKey(clipId);

  function handleKeyToggle() {
    if (!keyboard) {
      // no control
    } else if (isRemapActive) {
      keyboard.stopMapMode();
    } else {
      keyboard.startMapMode(clipId, (newKey: string) => {
        setRemapActive(false);
      });
    }
    setRemapActive((active) => !active);
  }

  return (
    <div className="flex flex-col justify-center">
      <div
        className={classCat([
          "mr-1 w-6 h-6 rounded-full noselect",
          "leading-6 text-center",
          isRemapActive
            ? "bg-white text-black shadow"
            : "bg-gray-light opacity-75 text-white",
        ])}
        onClick={handleKeyToggle}
      >
        {clipKey}
      </div>
    </div>
  );
};
export default ClipKeyBinding;
