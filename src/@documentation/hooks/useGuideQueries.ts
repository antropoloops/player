import { useQuery } from "react-query";
import API from "../../api";

export function useListGuidesQuery() {
  return useQuery(["guides"], () => API.guides.list());
}

export function useGuideQuery(path: string) {
  return useQuery(["guide", path], () => API.guides.get({ path }), {
    retry: false,
  });
}
