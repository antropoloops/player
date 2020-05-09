import React from "react";
import { ReactComponent as Circle } from "../shared/spinner.svg";
import "./Spinner.css";

interface SpinnerProps {
  center: "full" | "horizontal";
}

export const Spinner = ({ center }: SpinnerProps) => (
  <div className={`Spinner ${center}`}>
    <Circle className="spin" />
  </div>
);
