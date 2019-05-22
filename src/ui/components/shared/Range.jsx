import React from "react";
import "./Range.css";

const Range = ({ value, min, max, step, onChange }) => (
  <input
    className="Range"
    type="range"
    value={value}
    min={min}
    max={max}
    step={step}
    onChange={e => onChange(e.target.value)}
  />
);

export default Range;
