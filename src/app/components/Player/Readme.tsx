import React, { useReducer } from "react";
import { ArrowDown, ArrowUp } from "../../shared/Icons";
import { Markdown } from "../../shared/Markdown";
import "./Readme.css";

interface ReadmeProps {
  content: string;
}

export const Readme = ({ content }: ReadmeProps) => {
  const [isOpen, toggleOpen] = useReducer((x) => !x, false);

  if (!content.length) {
    return null;
  }

  const summary = getSummary(content);
  const isLarge = content.length > summary.length;

  return (
    <div className="Readme">
      <Markdown markdown={isOpen ? content : summary} />
      <button className="btn-link" onClick={toggleOpen}>
        {isLarge && (isOpen ? <ArrowUp /> : <ArrowDown />)}
      </button>
    </div>
  );
};

function getSummary(content: string) {
  const nextLineIndex = content.indexOf("\n");
  const firstLine =
    nextLineIndex > 0 ? content.slice(0, nextLineIndex) : content;
  if (firstLine.length < 100) {
    return firstLine;
  }

  const firstPointIndex = firstLine.search(/[.:]/);
  const firstSentence =
    firstPointIndex > 0 ? firstLine.slice(0, firstPointIndex) : firstLine;
  return firstSentence + ".";
}
