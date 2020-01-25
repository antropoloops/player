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
  return (
    <div className="Session">
      <img
        className="responsive"
        alt={audioset.meta.title}
        src={audioset.meta.logo_url}
      />
      <div className="info">
        <div className="actions">
          <button
            className="start btn-link"
            title="Start playing"
            onClick={onStart}
          >
            <img src="/play.png" alt="Start" />
          </button>
        </div>
        <Markdown markdown={audioset.meta.readme} />
      </div>
    </div>
  );
};
