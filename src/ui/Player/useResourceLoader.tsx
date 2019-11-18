import debug from "debug";
import { useEffect, useState } from "react";
import { player } from "../../player";

const log = debug("atpls:useResourceLoader");
export function useResourceLoader() {
  const [load, setLoad] = useState(player.resources.status);
  useEffect(() => {
    log("Installing resource loader");
    player.resources.preload();
    return player.onResourceStatusChanged(status => {
      setLoad(status);
    });
  }, []);
  return { load };
}
