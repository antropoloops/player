import debug from "debug";
import { useEffect, useState } from "react";
import { player } from "../../player";

const log = debug("atpls:useResourceLoader");
export function useResourceLoader() {
  const [status, setStatus] = useState(player.resources.getStatus());
  useEffect(() => {
    log("Installing resource loader");
    player.resources.preload();
    return player.onResourceStatusChanged(loadStatus => {
      setStatus(loadStatus);
    });
  }, []);
  return { status };
}
