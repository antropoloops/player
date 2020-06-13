import { GROUPS, TOPICS } from "./data/topics";
import { PAGES } from "./data/pages";
import { TopicGroupList, Topic, Page } from "./types";
import { getProject } from "./projects";
import { getAudioset } from "./audiosets";

const API = {
  projects: {
    get: getProject,
  },
  audiosets: {
    get: getAudioset,
  },
  topics: {
    list: listTopics,
    get: getTopic,
  },
  pages: {
    get: getPage,
  },
};

export default API;

async function listTopics(): Promise<TopicGroupList> {
  return {
    locale: "es",
    groups: GROUPS.map((group) => ({
      ...group,
      topics: TOPICS.filter((topic) => topic.group.id === group.id),
    })),
  };
}

async function getTopic({ path }: { path: string }): Promise<Topic> {
  const topic = TOPICS.find((t) => t.path === path);
  if (!topic) throw Error("not found");
  return topic;
}

type GetPage = {
  path: string;
  locale: string;
};
async function getPage({ path, locale }: GetPage): Promise<Page> {
  const page = PAGES.find((p) => p.path === path && p.locale === locale);
  if (!page) throw Error("Not found");
  return page;
}
