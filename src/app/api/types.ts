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
  image_url: string;
  groups: TopicGroup[];
};
