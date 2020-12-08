import { getOfflineMediaFile } from "../offline";
import { useQuery } from "react-query";

export function useOfflineMediaFileQuery(id?: string) {
  return useQuery(
    ["offline-fileData-file", id],
    (_, id) => getOfflineMediaFile(id || ""),
    { staleTime: Infinity, enabled: !!id }
  );
}
