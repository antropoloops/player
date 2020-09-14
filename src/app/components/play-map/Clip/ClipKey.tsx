import React, { useState } from "react";
import { KeyboardController } from "../../../../player/Control";
import classCat from "classcat";

type Props = {
  clipId: string;
  keyboard: KeyboardController;
};
const ClipKey: React.FC<Props> = ({ clipId, keyboard }) => {
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
          "mr-2 w-8 h-8 rounded-full noselect",
          "leading-8 text-center",
          isRemapActive
            ? "bg-white text-black shadow"
            : "bg-gray-medium text-white",
        ])}
        onClick={handleKeyToggle}
      >
        {clipKey}
      </div>
    </div>
  );
};
export default ClipKey;
