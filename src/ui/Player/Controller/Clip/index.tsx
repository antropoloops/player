import React from "react";
import { PlayerControl } from "../../../../player/Control";
import "./Clip.css";
import { ClosedClip } from "./ClipClosed";
import { OpenClip } from "./ClipOpen";

export interface ClipProps {
  clip: any;
  isActive?: boolean;
  control: PlayerControl;
}

export const Clip = ({ clip, isActive, control }: ClipProps) => {
  const View = isActive ? OpenClip : ClosedClip;

  return <View clip={clip} control={control} />;
};
