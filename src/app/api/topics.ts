import { GROUPS, TOPICS } from "./data/topics.data";
import { COSMIC_KEY } from "../config";
import ky from "ky";

const PROPS = "slug,title,content,metadata,";
const URL = "https://api.cosmicjs.com/v1/playantropoloops";

export const cosmicUrl = (slug: string) =>
  `${URL}/object/${slug}?pretty=true&hide_metafields=true&read_key=${COSMIC_KEY}&props=${PROPS}
  `;

export type Topic = {
  id: string;
  title: string;
  path: string;
  readme: string;
  group: {
    id: string;
    title: string;
  };
};

export type TopicGroup = {
  id: string;
  title: string;
  topics: {
    id: string;
    title: string;
    path: string;
  }[];
};

export type TopicGroupList = {
  locale: string;
  groups: TopicGroup[];
};

export async function listTopics(): Promise<TopicGroupList> {
  return {
    locale: "es",
    groups: GROUPS.map((group) => ({
      ...group,
      topics: TOPICS.filter((topic) => topic.group.id === group.id),
    })),
  };
}

export async function getTopic({ path }: { path: string }): Promise<Topic> {
  const data = await ky.get(cosmicUrl(path)).json();
  if (!data) throw Error("Not found");

  const object = (data as any).object as any;

  return {
    id: object.slug,
    title: object.title,
    path: object.slug,
    readme: object.content,
    group: {
      id: object.metadata.group,
      title: object.metadata.group,
    },
  };
}
