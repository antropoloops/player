import { useQuery } from "react-query";
import {
  GetGroup,
  GetGroupArchive,
  getGroupArchive,
  listArchiveRecordings,
  listGroupArchives,
} from "../service";

export function useListGroupArchives(query: GetGroup) {
  return useQuery(["Archives", query], () => listGroupArchives(query), {
    enabled: !!query.groupId,
  });
}

export function useGetGroupArchive(query: GetGroupArchive) {
  return useQuery(["Archive", query], () => getGroupArchive(query), {
    enabled: !!query.groupId && !!query.archiveId,
  });
}

export function useListArchiveRecordings(query: GetGroupArchive) {
  return useQuery(
    ["Archive", "recordings", query],
    () => listArchiveRecordings(query),
    {
      enabled: !!query.groupId && !!query.archiveId,
    }
  );
}
