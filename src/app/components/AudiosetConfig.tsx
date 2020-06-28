import React from "react";
import { useFullscreen } from "../hooks/useFullscreen";
import { ReactComponent as EnterFullscreen } from "../assets/fullscreen.svg";
import { ReactComponent as ExitFullscreen } from "../assets/exit-fullscreen.svg";
import { ReactComponent as CloseCircle } from "../assets/close-circle.svg";
import { ReactComponent as Stop } from "../assets/stop-circle.svg";
import useLocale from "../hooks/useLocale";

type Props = {
  onClose: () => void;
  onStop: () => void;
  onQuit: () => void;
};

const ConfigPage: React.FC<Props> = ({ onClose, onStop, onQuit }) => {
  const { toggleFullscreen, isFullscreen } = useFullscreen();
  const { formatMessage: FMT } = useLocale();
  return (
    <div className="p-4 flex flex-col flex-wrap bg-gray-medium">
      <button
        className="flex items-center p-2 bg-gray-light rounded hover:bg-white"
        onClick={() => {
          toggleFullscreen();
          onClose();
        }}
      >
        {isFullscreen ? (
          <ExitFullscreen className="w-4 h-4 text-black" />
        ) : (
          <EnterFullscreen className="w-4 h-4 text-black" />
        )}
        <label className="ml-4">
          {isFullscreen ? FMT("fullscreen-exit") : FMT("fullscreen-enter")}
        </label>
      </button>
      <button
        className="flex items-center p-2 mt-4 bg-gray-light hover:bg-white rounded"
        onClick={onStop}
      >
        <Stop className="w-6 h-6 mr-2" />
        {FMT("stop-all")}
      </button>
      <button
        className="flex items-center p-2 mt-4 bg-gray-light hover:bg-white hover:text-red rounded"
        onClick={onQuit}
      >
        <CloseCircle className="w-6 h-6 mr-2" />
        {FMT("stop-and-exit")}
      </button>
    </div>
  );
};

export default ConfigPage;
