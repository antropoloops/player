import React from "react";
import Layout from "../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../api";
import TopicBrowser from "../components/topics/TopicBrowser";
import { useDeviceType } from "../hooks/useDeviceType";
import { Readme } from "../components/shared/Readme";
import usePage from "../hooks/usePage";
import WhitePage from "../components/shared/PageDesktop";
import useLocale from "../hooks/useLocale";

type Props = {};

const TopicListPage: React.FC<Props> = () => {
  const { formatMessage: FMT } = useLocale();
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
    <Layout title={FMT("topics")} desktop={<WhitePage page={page} />}>
      {section && <img alt="" src={section.image_url} />}
      {isMobile && page && (
        <Readme className="p-4 mb-2 bg-gray-medium" content={page.content} />
      )}
      {topics && <TopicBrowser topics={topics} inline={isMobile} />}
    </Layout>
  );
};

export default TopicListPage;
