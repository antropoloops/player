import React from "react";
import { FullscreenIcon, Stop } from "../shared/Icons";
import "./Footer.css";

interface FooterProps {
  onStopAll: () => void;
  onFullscreen: () => void;
}

export const Footer = ({ onFullscreen, onStopAll }: FooterProps) => {
  return (
    <div className="footer PlayerFooter">
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
    </div>
  );
};
