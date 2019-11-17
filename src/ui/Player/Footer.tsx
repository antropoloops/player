import React from "react";
import { player } from "../../player";
import { Stop } from "../shared/Icons";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer PlayerFooter">
      <button
        className="btn-link"
        title="Stop all"
        onClick={() => player.control.stopAll(0)}
      >
        <Stop />
      </button>
    </div>
  );
};
