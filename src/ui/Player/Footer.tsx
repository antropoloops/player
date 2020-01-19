import React from "react";
import { FullscreenIcon, Stop } from "../shared/Icons";

interface FooterProps {
  onStopAll: () => void;
  onFullscreen: () => void;
}

export const Footer = ({ onFullscreen, onStopAll }: FooterProps) => {
  return (
    <footer className="Footer">
      <div className="left">...</div>
      <div className="center" />
      <div className="right">
        <button className="btn-link" title="Full screen" onClick={onFullscreen}>
          <FullscreenIcon />
        </button>
        <button className="btn-link" title="Stop all" onClick={onStopAll}>
          <Stop />
        </button>
      </div>
    </footer>
  );
};
