import { useQuery } from "react-query";
import { listSounds, getOfflineSound } from "../backend";

export function useSoundList() {
  return useQuery(["offline-sounds"], listSounds);
}

export function useSoundQuery(id: string) {
  return useQuery(["offline-sound", id], () => getOfflineSound(id));
}
