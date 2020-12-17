import { useQuery } from "react-query";
import API from "../../api";

export function useListTopicQuery() {
  return useQuery(["topic"], () => API.topics.list());
}

export function useGetTopicQuery(path: string) {
  return useQuery(["topic", path], () => API.topics.get({ path }));
}
