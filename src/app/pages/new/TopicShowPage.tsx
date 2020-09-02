import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import TopicBrowser from "../../components/topics/TopicBrowser";
import { useRouteMatch } from "react-router-dom";
import HtmlContent from "../../components/HtmlContent";
import routes from "../../routes";
import PageDesktop from "../../components/pages/PageDesktop";
import cx from "classcat";
import useLocale from "../../hooks/useLocale";

type Props = {};

type RouteParams = {
  id: string;
};

const TopicShowPage: React.FC<Props> = () => {
  const { formatMessage: FMT } = useLocale();
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
      title={FMT("topics")}
      backTo={routes.topics()}
      desktop={<PageDesktop page={topic} white={true} />}
      sidebar={
        <div className="sidebar sm:pr-3">
          {section && <img alt="" src={section.image_url} />}
          {topics && <TopicBrowser topics={topics} active={topic} />}
        </div>
      }
    >
      <div className="p-4 text-white">
        {topic && (
          <h2 className="text-xl leading-tight mb-8 uppercase">
            {FMT(topic.metadata.group)}
          </h2>
        )}
        {topic && (
          <h1 className="text-4xl leading-tight mb-8">{topic.title}</h1>
        )}
        {
          <HtmlContent
            className={cx([
              "transition-all duration-200 ease-in-out",
              topic && topic.content ? "opacity-100" : "opacity-0",
            ])}
            force
            content={topic?.content || ""}
          />
        }
      </div>
    </Layout>
  );
};

export default TopicShowPage;
