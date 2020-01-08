import { useEffect, useState } from "react";
import * as Screenfull from "screenfull";

export interface Fullscreen {
  isFull: boolean;
  toggle: () => void;
}

export function useFullscreen(): Fullscreen {
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    if (Screenfull.isEnabled) {
      const screen = Screenfull;
      const handleChange = (event: Event) => {
        setIsFull(screen.isFullscreen);
      };

      screen.on("change", handleChange);
      return () => {
        screen.off("change", handleChange);
      };
    }
  });
  function toggle() {
    if (Screenfull.isEnabled) {
      const screen = Screenfull;
      screen.isFullscreen ? screen.exit() : screen.request();
    }
  }
  return { isFull, toggle };
}
