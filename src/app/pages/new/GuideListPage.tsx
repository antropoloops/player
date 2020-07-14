import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import useLocale from "../../hooks/useLocale";
import usePage from "../../hooks/usePage";
import HtmlContent from "../../components/HtmlContent";
import PageView from "../../components/pages/PageDesktop";

type Props = {};

const GuideListPage: React.FC<Props> = () => {
  const { formatMessage: f } = useLocale();
  const { data: section } = useQuery(["section", "guides"], (_, id) =>
    API.sections.get(id)
  );

  const { data: page } = usePage("guias");

  if (!section) return null;

  return (
    <Layout
      title={f(section.id)}
      sidebar={section && <img alt="" src={section.image_url} />}
      desktop={<PageView page={page} />}
    >
      {section && <img alt="" src={section.image_url} />}
      {page && <HtmlContent className="m-4" content={page?.content} />}
    </Layout>
  );
};

export default GuideListPage;
