import React, { useEffect, useReducer } from "react";
import { ArrowDown, ArrowUp } from "../shared/Icons";
import { Markdown } from "../shared/Markdown";
import "./Readme.css";

interface ReeadmeProps {
  closed: boolean;
  content: string;
}

export const Readme = ({ closed, content }: ReeadmeProps) => {
  const [isOpen, toggleOpen] = useReducer(x => !x, false);
  useEffect(() => {
    if (isOpen) {
      toggleOpen(null);
    }
  }, [content, toggleOpen]);

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
