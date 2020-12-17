import { DataStore } from "@aws-amplify/datastore";
import { useQuery } from "react-query";
import { filterBy, GetGroup, GetGroupProject } from "../../@offline/service";
import { Project, ProjectType, Track } from "../../models";

export function useListRemixesQuery(query: GetGroup) {
  return useQuery(["Remixes", query], () =>
    filterBy(DataStore.query(Project), (p) => p.type === ProjectType.REMIX)
  );
}

export function useGetRemixQuery(query: GetGroupProject) {
  return useQuery(["Project", query], () =>
    DataStore.query(Project, query.projectId)
  );
}

export function useListRemixTracksQuery(query: GetGroupProject) {
  return useQuery(["Tracks", query], () =>
    filterBy(DataStore.query(Track), (t) => t.projectID === query.projectId)
  );
}

export function useListRemixSamplesQuery(project: GetGroupProject) {
  return useQuery(["Samples", project], () => []);
}
