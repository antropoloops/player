import React from "react";
import { Markdown } from "../shared/Markdown";

export const OpenClip = ({ ref, clip, onClick }: any) => {
  const cover2 = clip.resources.cover2 && clip.resources.cover2.small;
  return (
    <div ref={ref} className="Clip open" onClick={onClick}>
      <div className="covers">
        <img className="cover" alt={clip.title} src={clip.coverUrl} />
        {cover2 ? (
          <img className="cover alternative" alt={clip.title} src={cover2} />
        ) : (
          <span className="cover alternative">&nbsp;</span>
        )}
      </div>
      <div className="meta">
        <h3 className="title">{clip.title}</h3>
        <p>{clip.artist}</p>
        <Markdown markdown={clip.readme} />
      </div>
    </div>
  );
};
