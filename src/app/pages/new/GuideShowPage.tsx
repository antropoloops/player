import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import Layout from "../../components/layout/Layout";
import GuideBrowser from "../../components/guides/GuideBrowser";
import API from "../../api";
import { useDeviceType } from "../../hooks/useDeviceType";
import { ReactComponent as DownloadIcon } from "../../assets/download.svg";
import routes from "../../routes";

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

  const Download = () => (
    <a
      href={fileUrl}
      className="w-full p-4 text-white flex flex-col items-center hover:text-white-light focus:outline-none"
      onClick={(e) => {
        if (!fileUrl) e.preventDefault();
      }}
    >
      <h1 className="text-xl">{title}</h1>
      <div className="p-2 text-center">
        {error ? (
          <p>
            Parece que el fichero no existe. Algunos están todavía en proceso.{" "}
            <br />
            Si crees que es un error, por favor, escríbenos a
            hola@antropoloops.com
          </p>
        ) : !guide ? (
          <p>Cargando...</p>
        ) : fileUrl ? (
          <DownloadIcon className="w-12 h-12 shadow" />
        ) : (
          <p>Fichero aun no disponible</p>
        )}
      </div>
    </a>
  );

  return (
    <Layout
      desktop={<Download />}
      sidebar={
        guides ? (
          <GuideBrowser guides={guides} inline={isMobile} />
        ) : (
          <div></div>
        )
      }
    >
      <div className="text-center">
        <Download />
        <Link className="text-green" to={routes.guides()}>
          &larr; Volver a las guías
        </Link>
      </div>
    </Layout>
  );
};
export default GuideShowPage;
