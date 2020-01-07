import { useEffect, useState } from "react";
import * as screen from "screenfull";

export interface Fullscreen {
  isFull: boolean;
  toggle: () => void;
}

export function useFullscreen(): Fullscreen {
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    const handleChange = (event: Event) => {
      if (screen.isEnabled) {
        screen.
      }
    };

    screen.on("change", handleChange);
    return () => {
      screen.isEnabled && screen.off("change", handleChange);
    };
  });
  useEffect(() => {
    if (screen.isEnabled) {
      isFull ? screen.request() : screen.exit();
    }
  }, [isFull]);
  const toggle = () => setIsFull(!isFull);
  return { isFull, toggle };
}

export function useFullscreenOld(onChange: (isFull: boolean) => void) {
  const [fullscreen, setFullscreen] = useState();
  const open = () => setFullscreen(Date.now());

  if (screen.isEnabled) {
    screen.on("change", () => onChange(screen.isEnabled));
  }

  useEffect(() => {
    if (!screen.isEnabled) {
      return;
    }
    if (fullscreen) {
      screen.request();
    } else {
      screen.exit();
    }
  }, [fullscreen]);

  return { open };
}
