import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import TopicBrowser from "../../components/topics/TopicBrowser";
import { useRouteMatch } from "react-router-dom";
import { Markdown } from "../../components/Markdown";
import routes from "../../routes";

type Props = {};

type RouteParams = {
  id: string;
};

const TopicViewPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: topics } = useQuery(["topics"], () => API.topics.list());
  const { data: topic } = useQuery(["topic", { path: params.id }], (_, p) =>
    API.topics.get(p)
  );
  const { data: section } = useQuery(["section", "topics"], () =>
    API.sections.get("topics")
  );

  return (
    <Layout
      title={`Temas: ${topic ? topic.metadata.group : "..."}`}
      backTo={routes.topics()}
      desktop={
        topic && (
          <div className="min-h-full bg-gray-medium text-white px-4 py-2">
            {topic.metadata.subtitle && (
              <h2 className="text-xl italic">{topic.metadata.subtitle}</h2>
            )}
            <h1 className="text-4xl mb-4">{topic.title}</h1>
            <Markdown markdown={topic.content || ""} />
          </div>
        )
      }
      sidebar={
        <>
          {section && <img alt="" src={section.image_url} />}
          {topics && <TopicBrowser topics={topics} active={topic} />}
        </>
      }
    >
      <div className="p-4 text-white">
        {topic && (
          <h1 className="text-4xl leading-tight mb-8">{topic.title}</h1>
        )}
        {topic && <Markdown markdown={topic.content || ""} />}
      </div>
    </Layout>
  );
};

export default TopicViewPage;
