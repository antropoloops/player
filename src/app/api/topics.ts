import { COSMIC_KEY } from "../config";
import ky from "ky";

const PROPS = "slug,title,content,metadata,";
const URL = "https://api.cosmicjs.com/v1/playantropoloops";

const GROUPS = ["play", "maps", "loops"];

export const getTopicUrl = (slug: string) =>
  `${URL}/object/${slug}?pretty=true&hide_metafields=true&read_key=${COSMIC_KEY}&props=${PROPS}`;

export const listTopicsUrl = () =>
  `${URL}/objects/?hide_metafields=true&read_key=${COSMIC_KEY}&type=temas&props=slug,title,metadata,`;

export type Topic = {
  slug: string;
  title: string;
  content?: string;
  metadata: {
    subtitle?: string;
    group: string;
    position: number;
  };
};

export type GroupedTopics = {
  locale: string;
  groups: {
    id: string;
    topics: Topic[];
  }[];
};

export async function listTopics(): Promise<GroupedTopics> {
  const data = await ky.get(listTopicsUrl()).json();
  if (!data) throw Error("Not found");

  const topics = (data as any).objects as Topic[];
  const byPosition = (a: Topic, b: Topic) =>
    a.metadata.position - b.metadata.position;

  return {
    locale: "es",
    groups: GROUPS.map((group) => ({
      id: group,
      topics: topics.filter((t) => t.metadata.group === group).sort(byPosition),
    })),
  };
}

export async function getTopic({ path }: { path: string }): Promise<Topic> {
  const data = await ky.get(getTopicUrl(path)).json();
  if (!data) throw Error("Not found");

  return (data as any).object as Topic;
}
