import { useEffect, useState } from "react";
import { player } from "../../Player";
import { ResourceLoadStatus } from "../../Player/ResourceLoader";

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
