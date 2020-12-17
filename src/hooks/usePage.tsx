import { useQuery, UseQueryOptions } from "react-query";
import API from "../api";
import { Page } from "../api/pages";

function usePage(slug: string, config?: UseQueryOptions<Page>) {
  return useQuery(
    ["page", { slug, locale: "es" }],
    () => API.pages.get({ slug, locale: "es" }),
    config
  );
}

export default usePage;
