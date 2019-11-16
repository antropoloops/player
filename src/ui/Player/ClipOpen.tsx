import React, { useReducer } from "react";
import { Clip } from "../../audioset";
import { ArrowDown, ArrowUp } from "../shared/Icons";
import { Markdown } from "../shared/Markdown";
import "./ClipOpen.css";

export const OpenClip = ({ ref, clip, onClick }: any) => {
  const [isReadmeVisible, toggleReadme] = useReducer(x => !x, false);
  const hasReadme = clip.readme;

  const Icon = isReadmeVisible ? ArrowUp : ArrowDown;

  const cover2 = clip.resources.cover2 && clip.resources.cover2.small;
  return (
    <div
      ref={ref}
      className="Clip open"
      style={{ backgroundColor: clip.color }}
    >
      <div className="covers" onClick={onClick}>
        <img className="cover" alt={clip.title} src={clip.coverUrl} />
        {cover2 ? (
          <img className="cover alternative" alt={clip.title} src={cover2} />
        ) : (
          <ClipInfo className="info" clip={clip} />
        )}
      </div>
      <div className="meta">
        <div className="column">
          <div className="clipName">{clip.name}</div>
          {hasReadme && <Icon onClick={toggleReadme} />}
        </div>
        {cover2 && <ClipInfo className="column" clip={clip} />}
      </div>
      <Markdown
        className={`expand ${isReadmeVisible ? "visible" : "hidden"}`}
        markdown={clip.readme}
      />
    </div>
  );
};

interface ClipInfoProps {
  className: string;
  clip: Clip;
}

const ClipInfo = ({ className, clip }: ClipInfoProps) => (
  <div className={className}>
    <h3 className="title">{clip.title}</h3>
    <p>{clip.artist}</p>
  </div>
);
