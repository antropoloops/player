import React from "react";
import Layout from "../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../api";
import useLocale from "../hooks/useLocale";
import usePage from "../hooks/usePage";
import GuideBrowser from "../components/guides/GuideBrowser";
import { useDeviceType } from "../hooks/useDeviceType";
import WhitePage from "../components/shared/WhitePage";
import { Readme } from "../components/shared/Readme";

type Props = {};

const GuideListPage: React.FC<Props> = () => {
  const { formatMessage: f } = useLocale();
  const { data: guides } = useQuery({
    queryKey: ["guides"],
    queryFn: () => API.guides.list(),
  });
  const { data: section } = useQuery(["section", "guides"], (_, id) =>
    API.sections.get(id)
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
