import React from "react";
import { ClosedClip } from "./ClosedClip";
import { OpenClip } from "./OpenClip";

interface ClipProps {
  clip: any;
  isActive: boolean;
  onClick: () => void;
}

export const Clip = ({ clip, isActive, onClick }: ClipProps) => {
  const View = isActive ? OpenClip : ClosedClip;

  return <View clip={clip} onClick={onClick} />;
};
