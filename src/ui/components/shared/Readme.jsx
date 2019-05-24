import React from "react";
import "./Readme.css";

export const Readme = ({ className, readme }) => (
  <div
    className={`Readme ${className || ""}`}
    dangerouslySetInnerHTML={{ __html: readme }}
  />
);
