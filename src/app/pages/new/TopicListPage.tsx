import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import TopicBrowser from "../../components/topics/TopicBrowser";
import { useDeviceType } from "../../hooks/useDeviceType";
import { Markdown } from "../../components/Markdown";
import { Readme } from "../../components/Player/Readme";

type Props = {};

const TopicListPage: React.FC<Props> = () => {
  const { data: topics } = useQuery(["topics"], () => API.topics.list());
  const { data: page } = useQuery(
    ["page", { path: "topics", locale: "es" }],
    (_, params) => API.pages.get(params)
  );
  const { data: section } = useQuery(["section", "topics"], () =>
    API.sections.get("topics")
  );
  const { isMobile } = useDeviceType();

  if (!topics) return null;

  return (
    <Layout
      title="Temas"
      desktop={
        page && (
          <div className="p-4 text-white">
            <h1 className="text-4xl mb-4">{page.title}</h1>
            <Markdown markdown={page.content} />
          </div>
        )
      }
    >
      {section && <img alt="" src={section.image_url} />}
      {isMobile && page && <Readme className="p-4" content={page.content} />}
      {topics && <TopicBrowser topics={topics} inline={isMobile} />}
    </Layout>
  );
};

export default TopicListPage;
