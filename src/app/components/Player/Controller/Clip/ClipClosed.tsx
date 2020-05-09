import React, { useReducer } from "react";
import { hasKeyboard } from "../../../../lib/hasKeyboard";
import "./ClipClosed.css";
import { ClipProps } from "./index";

export const ClosedClip: React.FC<ClipProps> = ({ clip, control }) => {
  const [isMapKeyboard, toggleMapKeyboard] = useReducer((x) => !x, false);

  const keyboard = control && control.keyboard;
  const clipKey = keyboard && keyboard.getKey(clip.id);
  const startClip = () => control && control.startClip(clip.id, 0);

  function handleKeyToggle() {
    if (!keyboard) {
      // no control
    } else if (isMapKeyboard) {
      keyboard.stopMapMode();
    } else {
      keyboard.startMapMode(clip.id, (newKey: string) => {
        toggleMapKeyboard();
      });
    }
    toggleMapKeyboard();
  }

  return (
    <div
      className="Clip closed"
      id={`clip-${clip.id}`}
      style={{ backgroundColor: clip.color }}
    >
      <div className="cover">
        <img alt={clip.title} src={clip.coverUrl} onClick={startClip} />
      </div>
      <div className="meta noselect" onClick={startClip}>
        <h3 className="title">{clip.title}</h3>
      </div>
      {hasKeyboard() && (
        <div className="keyboard noselect">
          <span
            className={isMapKeyboard ? "active" : "inactive"}
            onClick={handleKeyToggle}
          >
            {clipKey}
          </span>
        </div>
      )}
    </div>
  );
};
