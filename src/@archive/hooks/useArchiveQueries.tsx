import { useQuery } from "react-query";
import { GetGroup, GetGroupProject } from "../../@offline/service";
import {
  getGroupArchive,
  listArchiveRecordings,
  listGroupArchives,
} from "../service";

export function useListGroupArchives(query: GetGroup) {
  return useQuery(["Archives", query], () => listGroupArchives(query), {
    enabled: !!query.groupId,
  });
}

export function useGetGroupArchive(query: GetGroupProject) {
  return useQuery(["Archive", query], () => getGroupArchive(query), {
    enabled: !!query.groupId && !!query.projectId,
  });
}

export function useListArchiveRecordings(query: GetGroupProject) {
  return useQuery(
    ["Archive", "recordings", query],
    () => listArchiveRecordings(query),
    {
      enabled: !!query.groupId && !!query.projectId,
    }
  );
}
