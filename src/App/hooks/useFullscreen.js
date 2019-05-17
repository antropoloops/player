import { useEffect, useState } from "react";
import * as screen from "screenfull";
export default function useFullscreen(onChange) {
  const [fullscreen, setFullscreen] = useState(false);
  const open = () => setFullscreen(Date.now());

  screen.on("change", () => onChange(screen.isFullscreen));
  useEffect(() => {
    if (!screen.enabled) return;
    if (fullscreen) {
      screen.request();
    } else {
      screen.exit();
    }
  }, [fullscreen]);

  return { open };
}
