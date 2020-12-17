import { useQuery } from "react-query";
import {
  listGroups,
  listArchives,
  listRecordings,
  listRemixes,
  listSamples,
  getRemix,
  listRemixSamples,
  listRemixTracks,
} from "../service";

export function useListGroupsQuery() {
  return useQuery(["Groups"], listGroups);
}

export function useListArchivesQuery() {
  return useQuery(["Archives"], listArchives);
}

export function useListRecordingsQuery() {
  return useQuery(["Recordings"], listRecordings);
}

export function useListRemixesQuery(groupId?: string) {
  return useQuery(["Remixes", groupId], () => listRemixes(groupId));
}

export function useGetRemixQuery(id: string, groupId?: string) {
  return useQuery(["Remixes", groupId, id], () => getRemix(id));
}

export function useListSamplesQuery() {
  return useQuery(["Samples"], listSamples);
}
export function useListRemixSamplesQuery(groupId: string, remixId: string) {
  return useQuery(["Samples", groupId, remixId], () =>
    listRemixSamples(groupId, remixId)
  );
}

export function useListRemixTracksQuery(remixId: string) {
  return useQuery(["Tracks", "remix", remixId], () => listRemixTracks(remixId));
}
