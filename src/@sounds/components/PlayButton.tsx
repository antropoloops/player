import React from "react";
import { PlayIcon, PauseIcon, StopIcon } from "../../components/icons/Icons";

type PlayButtonProps = {
  className?: string;
  onClick?: () => void;
  playing?: boolean;
  pausable?: boolean;
};

export function PlayButton({
  className,
  onClick,
  playing,
  pausable,
}: PlayButtonProps) {
  const Icon = playing ? (pausable ? PauseIcon : StopIcon) : PlayIcon;
  return (
    <button
      className="border-2 border-sounds rounded-full mr-4"
      onClick={onClick}
    >
      <Icon className="w-12 h-12 fill-current" />
    </button>
  );
}
