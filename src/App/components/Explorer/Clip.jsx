import React from "react";
import "./Clip.css";

const upperCase = str => str && str.toUpperCase();

const ClipSummary = ({ clip, onClick }) => (
  <div className="Clip summary">
    <button className="cover" onClick={() => onClick(clip)}>
      <img src={clip.coverUrl} alt={clip.id} />
    </button>
    <div className="info">
      <p>{clip.title}</p>
      <p>{clip.author}</p>
      <p>{clip.year}</p>
    </div>
    <div className="actions">
      <h3 className="keyMap" style={{ color: clip.color }}>
        {upperCase(clip.key)}
      </h3>
    </div>
  </div>
);

const ClipInfo = ({ clip, onClick }) => (
  <div className="Clip info">
    <button className="cover" onClick={() => onClick(clip)}>
      <img src={clip.coverUrl} alt={clip.id} />
    </button>
  </div>
);

export default props =>
  props.active ? <ClipInfo {...props} /> : <ClipSummary {...props} />;
