import React from "react";
import { Link } from "react-router-dom";
import { Audioset } from "../../../audioset";
import { Markdown } from "../Markdown";
import "./Session.css";
import routes from "../../routes";

interface SessionProps {
  audioset: Audioset;
  isStarted: boolean;
  onStart: () => void;
}

export const Session = ({ audioset, isStarted, onStart }: SessionProps) => {
  const { meta } = audioset;
  return (
    <div className="Session">
      <img className="responsive" alt={meta.title} src={meta.logo_url} />
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
        <div className="actions">
          <Link
            to={meta.parent_path ? routes.set(meta.parent_path) : routes.sets()}
          >
            Cerrar
          </Link>
        </div>
        <Markdown markdown={meta.readme} />
      </div>
    </div>
  );
};
