import React, { useReducer } from "react";
import { player } from "../../player";
import { hasKeyboard } from "../hasKeyboard";
import "./ClipClosed.css";

export const ClosedClip = ({ clip, onClick }: any) => {
  const [isMapKeyboard, toggleMapKeyboard] = useReducer(x => !x, false);

  const clipKey = player.control.keyboard.getKey(clip.id);

  function handleKeyToggle() {
    const { keyboard } = player.control;

    if (isMapKeyboard) {
      keyboard.stopMapMode();
    } else {
      keyboard.startMapMode(clip.id, (newKey: string) => {
        toggleMapKeyboard(null);
      });
    }
    toggleMapKeyboard(null);
  }

  return (
    <div
      className="Clip closed"
      id={`clip-${clip.id}`}
      style={{ backgroundColor: clip.color }}
    >
      <div className="cover">
        <img alt={clip.title} src={clip.coverUrl} onClick={onClick} />
      </div>
      <div className="meta noselect" onClick={onClick}>
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
