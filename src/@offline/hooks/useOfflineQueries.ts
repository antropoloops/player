import { useQuery } from "react-query";
import { listGroups, listSamples } from "../service";

export function useListGroupsQuery() {
  return useQuery(["Groups"], listGroups);
}

export function useListSamplesQuery() {
  return useQuery(["Samples"], listSamples);
}
