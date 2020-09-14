import React from "react";
import { hasKeyboard } from "../../../lib/hasKeyboard";
import ClipKey from "./ClipKey";
import { ClipProps } from "./index";

export const ClosedClip: React.FC<ClipProps> = ({ clip, control }) => {
  const startClip = () => control && control.startClip(clip.id, 0);
  const keyboard = control && control.keyboard;

  return (
    <div
      className="flex text-gray-dark cursor-pointer noselect"
      id={`clip-${clip.id}`}
      style={{ backgroundColor: clip.color }}
    >
      <div className="ratio max-w-cover-xs mr-2 bg-gray-dark bg-opacity-50">
        <svg viewBox="0 0 1 1" />
        {clip.coverUrl && (
          <img
            className="bg-light-gray"
            alt={clip.title}
            src={clip.coverUrl}
            width="400"
            height="400"
            onClick={startClip}
          />
        )}
      </div>
      <div
        className="flex-grow flex flex-col justify-center"
        onClick={startClip}
      >
        <h3>{clip.title}</h3>
      </div>
      {hasKeyboard() && keyboard && (
        <ClipKey clipId={clip.id} keyboard={keyboard} />
      )}
    </div>
  );
};
