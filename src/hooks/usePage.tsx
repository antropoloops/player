import { useQuery, QueryOptions } from "react-query";
import API from "../api";
import { Page } from "../api/pages";

function usePage(slug: string, config?: QueryOptions<Page>) {
  return useQuery({
    queryKey: ["page", { slug, locale: "es" }],
    queryFn: (_, params) => API.pages.get(params),
    config,
  });
}

export default usePage;
