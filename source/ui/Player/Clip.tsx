import React from "react";
import "./Clip.css";
import { ClosedClip } from "./ClipClosed";
import { OpenClip } from "./ClipOpen";

interface ClipProps {
  clip: any;
  isActive: boolean;
  onClick: () => void;
}

export const Clip = ({ clip, isActive, onClick }: ClipProps) => {
  const View = clip.id === "nubian" || isActive ? OpenClip : ClosedClip;

  return <View clip={clip} onClick={onClick} />;
};
