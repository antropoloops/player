import { useEffect, useState } from "react";
import * as Screenfull from "screenfull";

export interface Fullscreen {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export function useFullscreen(): Fullscreen {
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    if (Screenfull.isEnabled) {
      const screen = Screenfull;
      const handleChange = (event: Event) => {
        setIsFullscreen(screen.isFullscreen);
      };

      screen.on("change", handleChange);
      return () => {
        screen.off("change", handleChange);
      };
    }
  });
  function toggleFullscreen() {
    if (Screenfull.isEnabled) {
      const screen = Screenfull;
      screen.isFullscreen ? screen.exit() : screen.request();
    }
  }
  return { isFullscreen, toggleFullscreen };
}
