import React from "react";
import { Audioset } from "../../audioset";
import { Markdown } from "../shared/Markdown";
import "./Preview.css";

interface PreviewProps {
  audioset: Audioset;
  isReady: boolean;
  onStart: () => void;
}

export const Preview = ({ audioset, isReady, onStart }: PreviewProps) => {
  return (
    <div className="Preview">
      <img alt={audioset.meta.title} src={audioset.meta.logo_url} />

      <div className="inside">
        {!isReady && (
          <div className="StartButton">
            <button
              className="btn-link"
              title="Start playing"
              onClick={onStart}
            >
              <img src="/play.png" alt="Start" />
            </button>
          </div>
        )}
        <Markdown markdown={audioset.meta.readme} />
      </div>
    </div>
  );
};
