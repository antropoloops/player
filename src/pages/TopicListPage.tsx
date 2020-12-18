import React from "react";
import Layout from "../components/layout/Layout";
import TopicBrowser from "../components/topics/TopicBrowser";
import { useDeviceType } from "../hooks/useDeviceType";
import { Readme } from "../components/shared/Readme";
import usePage from "../hooks/usePage";
import WhitePage from "../components/shared/PageDesktop";
import useLocale from "../hooks/useLocale";
import { useListTopicQuery } from "../@documentation/hooks/useTopicQueries";
import { getSection } from "../@core/helpers/sectionHelpers";

type Props = {};

const TopicListPage: React.FC<Props> = () => {
  const { formatMessage: FMT } = useLocale();
  const { data: topics } = useListTopicQuery();
  const { data: page } = usePage("temas");
  const { isMobile } = useDeviceType();

  const section = getSection("topics");

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
