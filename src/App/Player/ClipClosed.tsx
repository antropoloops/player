import React from "react";

export const ClosedClip = ({ ref, clip, onClick }: any) => {
  return (
    <div className="Clip closed">
      <img
        className="cover"
        alt={clip.title}
        src={clip.coverUrl}
        onClick={onClick}
      />
      <div className="meta" onClick={onClick}>
        <h3 className="title">{clip.title}</h3>
      </div>
      <div className="keyboard">
        <span>{clip.keyMap}</span>
      </div>
    </div>
  );
};