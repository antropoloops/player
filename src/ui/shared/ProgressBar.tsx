import React from "react";

interface ProgressBarProps {
  progress: number;
}

const SIZE = 250;
const MARGIN = 10;

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <svg width={SIZE + 2 * MARGIN} height="20" viewBox={`0 0 ${SIZE} 20`}>
    <line
      x1="0"
      y1="10"
      x2={SIZE}
      y2="10"
      fill="none"
      strokeWidth="12"
      stroke="#000000"
      strokeLinecap="round"
    />
    <line
      x1="0"
      y1="10"
      x2={Math.floor(progress * SIZE)}
      y2="10"
      fill="none"
      strokeWidth="12"
      stroke="#00FF00"
      strokeDasharray="170"
      strokeDashoffset="dashOffsetLine"
      strokeLinecap="round"
      id="lineInner"
    />
  </svg>
);
