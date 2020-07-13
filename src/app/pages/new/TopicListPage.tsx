import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import TopicBrowser from "../../components/topics/TopicBrowser";
import { useDeviceType } from "../../hooks/useDeviceType";
import { Readme } from "../../components/Player/Readme";
import usePage from "../../hooks/usePage";
import PageDesktop from "../../components/pages/PageDesktop";

type Props = {};

const TopicListPage: React.FC<Props> = () => {
  const { data: topics } = useQuery({
    queryKey: ["topics"],
    queryFn: () => API.topics.list(),
  });
  const { data: page } = usePage("temas");
  const { data: section } = useQuery(["section", "topics"], () =>
    API.sections.get("topics")
  );
  const { isMobile } = useDeviceType();

  if (!topics) return null;

  return (
    <Layout title="Temas" desktop={<PageDesktop page={page} />}>
      {section && <img alt="" src={section.image_url} />}
      {isMobile && page && <Readme className="p-4" content={page.content} />}
      {topics && <TopicBrowser topics={topics} inline={isMobile} />}
    </Layout>
  );
};

export default TopicListPage;
