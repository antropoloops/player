import React from "react";
const upperCase = str => str && str.toUpperCase();
export const Clip = ({ clip, onClick, active }) => (
  <div className={`Clip ${active ? "active" : ""}`}>
    <button className="main" onClick={() => onClick(clip)}>
      <img src={clip.coverUrl} alt={clip.id} />
      <div className="meta">
        <p>{clip.title}</p>
        <p>{clip.author}</p>
        <p>{clip.year}</p>
      </div>
    </button>
    <div className="actions">
      <h3 className="keyMap">{upperCase(clip.key)}</h3>
    </div>
  </div>
);
