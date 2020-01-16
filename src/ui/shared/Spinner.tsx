import React from "react";
import { ReactComponent as Circle } from "../shared/spinner.svg";

import "./Spinner.css";

export const Spinner = () => (
  <div className="Spinner">
    <Circle />
  </div>
);
