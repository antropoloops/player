import React from "react";
import { Audioset } from "../../Audioset";
import {
  LoadingResources,
  ResourceLoadStatus,
} from "../../Player/ResourceLoader";
import { Markdown } from "../shared/Markdown";
import "./Preview.css";

function completed(status: LoadingResources) {
  return status.completed / status.total;
}

const Preview = ({ audioset, onStart, resourceStatus }: PreviewProps) => {
  return (
    <div className="Preview">
      <img alt={audioset.meta.title} src={audioset.meta.logo_url} />

      <div className="inside">
        <div>{audioset.meta.description}</div>
        <Markdown markdown={audioset.meta.readme} />
        {resourceStatus.status === "loading" && (
          <ProgressBar progress={completed(resourceStatus)} />
        )}
        {resourceStatus.status === "pending" && (
          <StartButton onStart={onStart} />
        )}
      </div>
    </div>
  );
};

export default Preview;
interface StartButtonProps {
  onStart: () => void;
}

interface PreviewProps extends StartButtonProps {
  audioset: Audioset;
  resourceStatus: ResourceLoadStatus;
}

const StartButton = ({ onStart }: StartButtonProps) => (
  <div className="start">
    <a onClick={onStart}>
      <img src="/play.png" alt="Empezar" />
    </a>
  </div>
);

interface ProgressBarProps {
  progress: number;
}

const SIZE = 250;
const MARGIN = 10;

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <svg width={SIZE + 2 * MARGIN} height="20" viewBox={`0 0 ${SIZE} 20`}>
    <line
      x1="0"
      y1="10"
      x2={SIZE}
      y2="10"
      fill="none"
      stroke-width="12"
      stroke="#000000"
      stroke-linecap="round"
    />
    <line
      x1="0"
      y1="10"
      x2={Math.floor(progress * SIZE)}
      y2="10"
      fill="none"
      stroke-width="12"
      stroke="#00FF00"
      stroke-dasharray="170"
      stroke-dashoffset="dashOffsetLine"
      stroke-linecap="round"
      id="lineInner"
    />
  </svg>
);
