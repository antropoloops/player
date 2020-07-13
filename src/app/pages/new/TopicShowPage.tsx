import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import TopicBrowser from "../../components/topics/TopicBrowser";
import { useRouteMatch } from "react-router-dom";
import HtmlContent from "../../components/HtmlContent";
import routes from "../../routes";
import PageDesktop from "../../components/pages/PageDesktop";

type Props = {};

type RouteParams = {
  id: string;
};

const TopicShowPage: React.FC<Props> = () => {
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
      desktop={<PageDesktop page={topic} white={true} />}
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
        {topic && <HtmlContent markdown={topic.content || ""} />}
      </div>
    </Layout>
  );
};

export default TopicShowPage;
