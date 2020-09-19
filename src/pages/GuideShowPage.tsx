import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import Layout from "../components/layout/Layout";
import GuideBrowser from "../components/guides/GuideBrowser";
import API from "../api";
import { useDeviceType } from "../hooks/useDeviceType";
import routes from "../routes";
import DownloadFile from "../components/guides/DownloadFile";

type RouteParams = {
  id: string;
};

type Props = {};

const GuideShowPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: guides } = useQuery({
    queryKey: ["guides"],
    queryFn: () => API.guides.list(),
  });
  const { data: guide, error } = useQuery(
    ["guide", { path: params.id }],
    (_, p) => API.guides.get(p),
    { retry: false }
  );
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
