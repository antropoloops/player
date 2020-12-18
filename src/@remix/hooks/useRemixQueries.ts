import { DataStore } from "@aws-amplify/datastore";
import { useQuery } from "react-query";
import { filterBy, GetGroup, GetGroupProject } from "../../@backend/service";
import { Project, ProjectType, Selection, Track } from "../../models";

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
export function useListRemixSelectionsQuery(query: GetGroupProject) {
  return useQuery(["Selections", query], () =>
    filterBy(DataStore.query(Selection), (t) => t.projectID === query.projectId)
  );
}

export function useListTrackSamplesQuery(
  query: GetGroupProject,
  track?: Track
) {
  return useQuery(
    ["Selections", query, track?.id || ""],
    () => {
      const ids = track?.clips.map((c) => c.selectionID) || [];
      return filterBy(
        DataStore.query(Selection),
        (selection) =>
          selection.projectID === query.projectId && ids.includes(selection.id)
      );
    },
    {
      enabled: !!track,
    }
  );
}

export function useListRemixSamplesQuery(project: GetGroupProject) {
  return useQuery(["Samples", project], () => []);
}
