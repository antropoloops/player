import React, { useReducer } from "react";
import { ArrowDown, ArrowUp } from "../shared/Icons";
import { Markdown } from "../shared/Markdown";
import "./ClipOpen.css";

export const OpenClip = ({ ref, clip, onClick }: any) => {
  const [isReadmeVisible, toggleReadme] = useReducer(x => !x, false);
  const hasReadme = clip.readme;

  const Icon = isReadmeVisible ? ArrowUp : ArrowDown;

  const cover2 = clip.resources.cover2 && clip.resources.cover2.small;
  return (
    <div ref={ref} className="Clip open">
      <div className="covers" onClick={onClick}>
        <img className="cover" alt={clip.title} src={clip.coverUrl} />
        {cover2 ? (
          <img className="cover alternative" alt={clip.title} src={cover2} />
        ) : (
          <span className="cover alternative">&nbsp;</span>
        )}
      </div>
      <div className="info">
        <div className="meta">
          <div className="column">
            <div className="clipName">{clip.name}</div>
            {hasReadme && <Icon onClick={toggleReadme} />}
          </div>
          <div className="column">
            <h3 className="title">{clip.title}</h3>
            <p>{clip.artist}</p>
          </div>
        </div>
        <Markdown
          className={`expand ${isReadmeVisible ? "visible" : "hidden"}`}
          markdown={clip.readme}
        />
      </div>
    </div>
  );
};
