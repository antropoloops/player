import debug from "debug";
import { useEffect } from "react";

const log = debug("atpls:useKeyboard");

type KeyboardListener = {
  keyDown: (key: string) => void;
  keyUp: (key: string) => void;
};

export function useKeyboardListener(keyboard?: KeyboardListener) {
  useEffect(() => {
    if (keyboard) {
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
  }, [keyboard]);
}
