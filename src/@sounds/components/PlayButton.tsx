import classcat from "classcat";
import React, { CSSProperties } from "react";
import { PlayIcon, PauseIcon, StopIcon } from "../../components/icons/Icons";

type PlayButtonProps = {
  className?: string;
  onClick?: () => void;
  playing?: boolean;
  pausable?: boolean;
  style?: CSSProperties;
};

export function PlayButton({
  className,
  onClick,
  playing,
  pausable,
  style,
}: PlayButtonProps) {
  const Icon = playing ? (pausable ? PauseIcon : StopIcon) : PlayIcon;
  return (
    <button
      className={classcat(["border-2 rounded-full mr-4 ", className])}
      onClick={onClick}
      style={style}
    >
      <Icon className="m-1 w-10 h-10 fill-current" />
    </button>
  );
}
