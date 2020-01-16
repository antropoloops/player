import React from "react";
import { Audioset } from "../../audioset";
import "./Preview.css";
import { Readme } from "./Readme";

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
        <Readme content={audioset.meta.readme} closed={true} />
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
      </div>
    </div>
  );
};
