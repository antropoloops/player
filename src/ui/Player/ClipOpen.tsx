import React, { useReducer } from "react";
import { ArrowDown, ArrowUp } from "../shared/Icons";
import { Markdown } from "../shared/Markdown";
import "./ClipOpen.css";

export const OpenClip = ({ ref, clip, onClick }: any) => {
  const [isReadmeVisible, toggleReadme] = useReducer(x => !x, false);
  const hasReadme = clip.readme;

  const Icon = isReadmeVisible ? ArrowUp : ArrowDown;

  const clipToggle = (
    <div className="clipToggle" onClick={hasReadme && toggleReadme}>
      <div className="clipName noselect">{clip.name}</div>
      {hasReadme && <Icon />}
    </div>
  );
  const clipInfo = (
    <div className="clipInfo noselect" onClick={onClick}>
      <h3 className="title">{clip.title}</h3>
      <p>{clip.artist}</p>
    </div>
  );

  const cover2 = clip.resources.cover2 && clip.resources.cover2.small;
  return (
    <div
      ref={ref}
      className="Clip open"
      style={{ backgroundColor: clip.color }}
    >
      <div className="covers">
        <div className="cover">
          <img alt={clip.title} src={clip.coverUrl} onClick={onClick} />
        </div>
        {cover2 ? (
          <div className="cover">
            <img alt={clip.title} src={cover2} onClick={onClick} />
          </div>
        ) : (
          <div className="cover info">
            {clipInfo} {clipToggle}
          </div>
        )}
      </div>
      {cover2 && (
        <div className="meta">
          {clipToggle}
          {clipInfo}
        </div>
      )}
      <Markdown
        className={`expand ${isReadmeVisible ? "visible" : "hidden"}`}
        markdown={clip.readme}
      />
    </div>
  );
};
