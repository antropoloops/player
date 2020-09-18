import React from "react";
import IconButton from "../shared/IconButton";
import { ReactComponent as CloseIcon } from "../icons/close-24px.svg";

type Props = {
  onClose: () => void;
};

const AudioSettings: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="">
      <div className="flex">
        <IconButton icon={CloseIcon} onClick={onClose}>
          Cerrar
        </IconButton>
      </div>
    </div>
  );
};

export default AudioSettings;
