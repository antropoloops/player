import { PAGES } from "./data/pages";
import { Page } from "./types";
import { getProject } from "./projects";
import { getAudioset } from "./audiosets";
import { getBundle } from "./bundles";
import { listSections, getSection } from "./sections";
import { listTopics, getTopic } from "./topics";

const API = {
  projects: {
    get: getProject,
  },
  audiosets: {
    get: getAudioset,
  },
  bundles: {
    get: getBundle,
  },
  topics: {
    list: listTopics,
    get: getTopic,
  },
  pages: {
    get: getPage,
  },
  sections: {
    list: listSections,
    get: getSection,
  },
};

export default API;

type GetPage = {
  path: string;
  locale: string;
};
async function getPage({ path, locale }: GetPage): Promise<Page> {
  const page = PAGES.find((p) => p.path === path && p.locale === locale);
  if (!page) throw Error("Not found");
  return page;
}
