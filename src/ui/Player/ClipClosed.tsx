import React from "react";

export const ClosedClip = ({ clip, onClick }: any) => {
  return (
    <div
      className="Clip closed"
      id={`clip-${clip.id}`}
      style={{ backgroundColor: clip.color }}
    >
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
