import React from "react";
import { player } from "../../player";
import { Stop } from "../shared/Icons";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer PlayerFooter">
      <Stop onClick={() => player.control.stopAll(0)} />
    </div>
  );
};
