import debug from "debug";
import { useEffect } from "react";
import { player } from "../../player";

const log = debug("atpls:useKeyboard");

export function useKeyboardListener() {
  useEffect(() => addKeyboardListeners(), []);
}
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
