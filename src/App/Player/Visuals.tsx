import React, { RefObject, useEffect, useRef } from "react";
import { Audioset } from "../../Audioset";
import { player } from "../../Player";
import { ControlCommand } from "../../Player/AudiosetControl";
import { VisualControl as VisualControlType } from "../../visuals";

function handleCommands(visuals: VisualControlType) {
  return (command: ControlCommand) => {
    switch (command.command) {
      case "startClip":
        return visuals.startClip(command.clipId);
      case "stopClip":
        return visuals.stopClip(command.clipId);
    }
  };
}

export const Visuals = ({ audioset }: VisualsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useVisuals(audioset, ref);
  return <div id="visuals" ref={ref} />;
};
interface VisualsProps {
  audioset: Audioset;
}

function useVisuals(audioset: Audioset, ref: RefObject<HTMLDivElement>) {
  useEffect(() => {
    import("../../visuals/index").then(({ VisualControl }) => {
      if (ref.current && audioset) {
        const control = new VisualControl(audioset, ref.current);
        const removeCommands = player.onCommand(handleCommands(control));
        return () => {
          removeCommands();
          control.detach();
        };
      }
    });
  }, [audioset, ref.current]);
}
