import React from "react";
import { Audioset } from "../../audioset";
import { Markdown } from "../shared/Markdown";
import "./Session.css";

interface SessionProps {
  audioset: Audioset;
  isStarted: boolean;
  onStart: () => void;
}

export const Session = ({ audioset, isStarted, onStart }: SessionProps) => {
  const showStart = !isStarted;
  return (
    <div className="Session">
      <div className="info">
        <img alt={audioset.meta.title} src={audioset.meta.logo_url} />
        {showStart && (
          <button
            className="start btn-link"
            title="Start playing"
            onClick={onStart}
          >
            <img src="/play.png" alt="Start" />
          </button>
        )}
        <Markdown markdown={audioset.meta.readme} />
      </div>
    </div>
  );
};
