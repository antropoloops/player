import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import useLocale from "../../hooks/useLocale";

type Props = {};

const GuideListPage: React.FC<Props> = () => {
  const { formatMessage: f } = useLocale();
  const { data: section } = useQuery(["section", "guides"], (_, id) =>
    API.sections.get(id)
  );

  if (!section) return null;

  return (
    <Layout title={f(section.id.toUpperCase())}>
      {section && <img alt="" src={section.image_url} />}
      <p className="p-4 text-white leading-8">
        Estamos trabajando en las guías didácticas, aún no están listas
      </p>
    </Layout>
  );
};

export default GuideListPage;
