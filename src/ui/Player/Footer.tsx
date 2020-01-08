import React from "react";
import { player } from "../../player";
import { FullscreenIcon, Stop } from "../shared/Icons";
import "./Footer.css";

interface FooterProps {
  onFullscreen: () => void;
}

export const Footer = ({ onFullscreen }: FooterProps) => {
  return (
    <div className="footer PlayerFooter">
      <div className="left">...</div>
      <div className="center" />
      <div className="right">
        <button className="btn-link" title="Full screen" onClick={onFullscreen}>
          <FullscreenIcon />
        </button>
        <button
          className="btn-link"
          title="Stop all"
          onClick={() => player.control.stopAll(0)}
        >
          <Stop />
        </button>
      </div>
    </div>
  );
};
