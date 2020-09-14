import debug from "debug";
import { useEffect } from "react";
import { KeyboardController } from "../../player/Control";

const log = debug("atpls:useKeyboard");

export function useKeyboardListener(keyboard: KeyboardController | undefined) {
  useEffect(() => {
    if (keyboard) {
      return addKeyboardListeners(keyboard);
    }
  }, [keyboard]);
}
function addKeyboardListeners(keyboard: KeyboardController) {
  log("Installing keyboard");

  const onKeyDown = (event: KeyboardEvent) =>
    !event.metaKey && !event.ctrlKey && keyboard.keyDown(event.key);
  const onKeyUp = (event: KeyboardEvent) =>
    !event.metaKey && !event.ctrlKey && keyboard.keyUp(event.key);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  return () => {
    log("Dispose keyboard");
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
}
