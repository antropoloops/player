import React, { useReducer } from "react";
import { IconButton } from "../shared/IconButton";
import { ReactComponent as CloseIcon } from "../icons/close-24px.svg";
import { ReactComponent as RecordIcon } from "../icons/fiber_manual_record-24px.svg";
import { ReactComponent as StopIcon } from "../icons/stop-24px.svg";
import { ReactComponent as PlayIcon } from "../icons/play_arrow-24px.svg";
import cc from "classcat";

type Props = {
  onClose: () => void;
};

type RecordingState = "empty" | "recording" | "recorded" | "playing";
type RecordingAction = "press";

function reducer(
  state: RecordingState,
  action: RecordingAction
): RecordingState {
  switch (state) {
    case "empty":
      return "recording";
    case "recording":
      return "recorded";
    case "recorded":
      return "playing";
    case "playing":
      return "recorded";
    default:
      return state;
  }
}

const AudioSettings: React.FC<Props> = ({ onClose }) => {
  const [state, dispatch] = useReducer(reducer, "empty");
  return (
    <div className="">
      <label className="text-xs text-white-dark">Grabar (beta)</label>
      <div className="flex items-center py-2">
        <button
          className="w-6 h-6 bg-gray-medium rounded-full shadow focus:outline-none"
          onClick={() => dispatch("press")}
        >
          {state === "empty" ? (
            <RecordIcon className="fill-current text-red-700" />
          ) : state === "recorded" ? (
            <PlayIcon className="fill-current text-green" />
          ) : state === "playing" ? (
            <StopIcon className="fill-current text-gray-light" />
          ) : state === "recording" ? (
            <StopIcon className="fill-current text-gray-light" />
          ) : null}
        </button>
        <div
          className={cc([
            "bg-white-dark flex-grow h-1 m-2 rounded-full shadow",
            "animate-pulse",
          ])}
        />
      </div>
      <div className="flex">
        <IconButton icon={CloseIcon} onClick={onClose}>
          Cerrar
        </IconButton>
      </div>
    </div>
  );
};

export default AudioSettings;
