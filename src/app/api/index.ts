import { GROUPS, TOPICS } from "./data/topics";
import { README } from "./data/pages";
import { TopicGroupList, Topic } from "./types";

async function listTopics(): Promise<TopicGroupList> {
  return {
    locale: "es",
    image_url: "https://i.picsum.photos/id/200/900/600.jpg",
    groups: GROUPS.map((group) => ({
      ...group,
      topics: TOPICS.filter((topic) => topic.group.id === group.id),
    })),
  };
}

async function getTopic({ path }: { path: string }): Promise<Topic> {
  const topic = TOPICS.find((t) => t.path === path);
  if (!topic) throw Error("not found");
  return { ...topic, readme: README };
}

const API = {
  topics: {
    list: listTopics,
    get: getTopic,
  },
};

export default API;
