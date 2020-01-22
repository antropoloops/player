import React from "react";
import { Link } from "react-router-dom";
import { FullscreenIcon, Info, Stop } from "../shared/Icons";

interface FooterProps {
  onStopAll: () => void;
  onFullscreen: () => void;
}

export const Footer = ({ onFullscreen, onStopAll }: FooterProps) => {
  return (
    <footer className="Footer">
      <div className="left">
        <Link to="/about">
          <Info />
        </Link>
      </div>
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
