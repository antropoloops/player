export type Topic = {
  id: string;
  title: string;
  path: string;
  readme: string;
};

export type TopicGroup = {
  title: string;
  topics: {
    id: string;
    title: string;
    path: string;
  }[];
};

export type TopicGroupList = {
  locale: string;
  image_url: string;
  groups: TopicGroup[];
};
