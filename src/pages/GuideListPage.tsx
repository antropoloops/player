import React from "react";
import Layout from "../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../api";
import useLocale from "../hooks/useLocale";
import usePage from "../hooks/usePage";
import GuideBrowser from "../components/guides/GuideBrowser";
import { useDeviceType } from "../hooks/useDeviceType";
import WhitePage from "../components/shared/PageDesktop";
import { Readme } from "../components/shared/Readme";
import useAnalytics from "../hooks/useAnalytics";
import { useListGuidesQuery } from "../@documentation/hooks/useGuideQueries";

type Props = {};

const GuideListPage: React.FC<Props> = () => {
  useAnalytics();
  const { formatMessage: f } = useLocale();
  const { data: guides } = useListGuidesQuery();
  const { data: section } = useQuery(["section", "guides"], () =>
    API.sections.get("guides")
  );
  const { data: page } = usePage("guias");
  const { isMobile } = useDeviceType();

  if (!section) return null;

  return (
    <Layout title={f(section.id)} desktop={<WhitePage page={page} />}>
      {section && <img alt="" src={section.image_url} />}
      {isMobile && page && (
        <Readme className="p-4 mb-2 bg-gray-medium" content={page.content} />
      )}
      {guides && <GuideBrowser guides={guides} inline={isMobile} />}
    </Layout>
  );
};

export default GuideListPage;
