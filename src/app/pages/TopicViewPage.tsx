import React from "react";
import Layout from "../components/Layout";
import { useQuery } from "react-query";
import API from "../api";
import TopicBrowser from "../components/topics/TopicBrowser";
import { useRouteMatch } from "react-router-dom";
import { Markdown } from "../components/Markdown";
import { useDeviceType } from "../hooks/useDeviceType";
import routes from "../routes";

type Props = {};

type RouteParams = {
  id: string;
};

const TopicViewPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { isDesktop } = useDeviceType();
  const { data: topics } = useQuery(["topics"], () => API.topics.list());
  const { data: topic } = useQuery(["topic", { path: params.id }], (_, p) =>
    API.topics.get(p)
  );

  return isDesktop ? (
    <Layout
      header="Temas"
      headerPath={routes.topics()}
      desktop={
        topic && (
          <div className="h-full bg-gray-medium text-white px-4 py-2">
            <h1 className="text-4xl mb-4">{topic.title}</h1>
            <Markdown markdown={topic.readme} />
          </div>
        )
      }
    >
      {topics && <TopicBrowser topics={topics} active={topic} />}
    </Layout>
  ) : (
    <Layout
      header={`Temas: ${topic ? topic.group.title : "..."}`}
      headerPath={routes.topics()}
    >
      <div className="p-4 text-white">
        {topic && (
          <h1 className="text-4xl leading-tight mb-8">{topic.title}</h1>
        )}
        {topic && <Markdown markdown={topic.readme} />}
      </div>
    </Layout>
  );
};

export default TopicViewPage;
