import { useEffect, useState } from "react";
import { player } from "../../player";
import { ResourceLoadStatus } from "../../player/ResourceLoader";

export function useResourceLoadingStatus(): ResourceLoadStatus {
  const [status, setStatus] = useState(player.resources.status);
  useEffect(
    () =>
      player.onResourceStatusChanged(resourceStatus => {
        setStatus(resourceStatus);
      }),
    [],
  );
  return status;
}
