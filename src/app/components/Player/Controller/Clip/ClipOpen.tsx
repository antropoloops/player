import React, { useReducer } from "react";
import { ClipProps } from ".";
import { ArrowDown, ArrowUp } from "../../../Icons";
import HtmlContent from "../../../HtmlContent";
import "./ClipOpen.css";

export const OpenClip = ({ clip, control }: ClipProps) => {
  const [isReadmeVisible, toggleReadme] = useReducer((x) => !x, false);
  const hasReadme = clip.readme;

  const Icon = isReadmeVisible ? ArrowUp : ArrowDown;
  const stopClip = () => control && control.stopClip(clip.id, 0);

  const clipToggle = (
    <div
      className="clipToggle"
      onClick={(hasReadme && toggleReadme) || undefined}
    >
      <div className="clipName noselect">{clip.name}</div>
      {hasReadme && <Icon />}
    </div>
  );
  const clipInfo = (
    <div className="clipInfo noselect" onClick={stopClip}>
      <h3 className="title">{clip.title}</h3>
      <p>{clip.artist}</p>
    </div>
  );

  const cover2 = clip.resources.cover2 && clip.resources.cover2.small;
  return (
    <div className="Clip open" style={{ backgroundColor: clip.color }}>
      <div className="covers">
        <div className="ratio cover bg-gray-dark bg-opacity-50">
          <svg viewBox="0 0 1 1" />
          {clip.coverUrl && (
            <img alt={clip.title} src={clip.coverUrl} onClick={stopClip} />
          )}
        </div>
        {cover2 ? (
          <div className="cover">
            <img alt={clip.title} src={cover2} onClick={stopClip} />
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
      <HtmlContent
        className={`expand ${isReadmeVisible ? "visible" : "hidden"}`}
        content={isReadmeVisible ? clip.readme : ""}
      />
    </div>
  );
};
