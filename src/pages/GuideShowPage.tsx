import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Layout from "../components/layout/Layout";
import GuideBrowser from "../components/guides/GuideBrowser";
import { useDeviceType } from "../hooks/useDeviceType";
import routes from "../routes";
import DownloadFile from "../components/guides/DownloadFile";
import {
  useGuideQuery,
  useListGuidesQuery,
} from "../@documentation/hooks/useGuideQueries";

type RouteParams = {
  id: string;
};

type Props = {};

const GuideShowPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: guides } = useListGuidesQuery();
  const { data: guide, error } = useGuideQuery(params.id);
  const { isMobile } = useDeviceType();

  const extension = guide?.metadata?.pdf
    ? "pdf"
    : guide?.metadata?.doc
    ? "doc"
    : "";
  const title = `${params.id}.${extension}`;
  const fileUrl = guide?.metadata.pdf?.url || guide?.metadata.doc?.url || "";

  return (
    <Layout
      desktop={<DownloadFile title={title} fileUrl={fileUrl} error={error} />}
      sidebar={
        guides ? (
          <GuideBrowser guides={guides} inline={isMobile} />
        ) : (
          <div></div>
        )
      }
    >
      <div className="text-center">
        <DownloadFile title={title} fileUrl={fileUrl} error={error} />
        <Link className="text-green" to={routes.guides()}>
          &larr; Volver a las guías
        </Link>
      </div>
    </Layout>
  );
};
export default GuideShowPage;
