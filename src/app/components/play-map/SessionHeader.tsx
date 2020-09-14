import React from "react";
import { BundleMetadata } from "../../../audioset";
import { ArrowDown, ArrowUp } from "../Icons";

export const SessionHeader = ({
  meta,
  onToggle,
  isOpen,
}: SessionHeaderProps) => (
  <div className="Header">
    <button className="navigation btn-link" onClick={onToggle}>
      {isOpen ? <ArrowDown /> : <ArrowUp />}
      <h1>{meta.title}</h1>
    </button>
  </div>
);

interface SessionHeaderProps {
  meta: BundleMetadata;
  onToggle: () => void;
  isOpen: boolean;
}
