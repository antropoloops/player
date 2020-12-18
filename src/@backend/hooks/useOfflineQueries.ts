import { useQuery } from "react-query";
import { listGroups } from "../service";

export function useListGroupsQuery() {
  return useQuery(["Groups"], listGroups);
}
