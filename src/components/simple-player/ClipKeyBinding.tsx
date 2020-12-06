import React, { useState } from "react";
import cc from "classcat";
import { KeyboardController } from "../../player4";

type Props = {
  className?: string;
  clipId: string;
  keyboard: KeyboardController;
  size?: number;
};

const ClipKeyBinding: React.FC<Props> = ({
  className,
  clipId,
  keyboard,
  size = 6,
}) => {
  const [isRemapActive, setRemapActive] = useState(false);
  const clipKey = keyboard.getKey(clipId);

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
    <button
      className={cc([
        className,
        `w-${size} h-${size}`,
        "mr-1 rounded-full noselect hover:focus-none",
        "leading-6 text-center focus:outline-none",
        isRemapActive
          ? "bg-white text-black shadow"
          : "bg-gray-light opacity-75 text-white",
      ])}
      onClick={handleKeyToggle}
    >
      {clipKey}
    </button>
  );
};
export default ClipKeyBinding;
