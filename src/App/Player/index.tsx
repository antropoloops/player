import debug from "debug";
import React, { useEffect } from "react";
import { player } from "../../Player";
import { Player as PlayerView, PlayerProps } from "./Player";

const log = debug("atpls:player");

export const Player = (props: PlayerProps) => {
  useEffect(() => addKeyboardListeners());

  return <PlayerView {...props} />;
};

function addKeyboardListeners() {
  log("Installing keyboard");
  const keyboard = player.control.keyboard;

  const onKeyDown = (event: KeyboardEvent) => keyboard.keyDown(event.key);
  const onKeyUp = (event: KeyboardEvent) => keyboard.keyUp(event.key);

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return () => {
    log("Dispose keyboard");
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
}
