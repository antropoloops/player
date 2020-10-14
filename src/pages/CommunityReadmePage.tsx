import React from "react";
import { useQuery } from "react-query";
import useAnalytics from "../hooks/useAnalytics";
import LoadingScreen from "../components/LoadingScreen";
import API from "../api";
import { Link } from "react-router-dom";
import routes from "../routes";
import ErrorScreen from "../components/ErrorScreen";
import Layout from "../components/layout/Layout";
import ProjectAudiosetItem from "../components/project/ProjectAudiosetItem";
import usePage from "../hooks/usePage";
import PageDesktop from "../components/shared/PageDesktop";
import { communityProject } from "../audioset/helpers";
import { useDeviceType } from "../hooks/useDeviceType";

type Props = {
  idOrUrl: string;
};

const CommunityReadmePage: React.FC<Props> = ({ idOrUrl }) => {
  useAnalytics();
  const { isDesktop, isMobile } = useDeviceType();
  const { isError, data: audioset } = useQuery(
    ["bundle", { path: idOrUrl }],
    (_, params) => API.bundles.get(params),
    { retry: false }
  );
  const { data: project, status: projectStatus } = useQuery(
    ["community"],
    () => API.bundles.get({ path: "comunidad" }).then(communityProject),
    { retry: false }
  );

  const pageUrl = audioset?.meta.description.split("cosmic@")[1];
  const { data: page } = usePage(pageUrl || "", { enabled: pageUrl });

  if (isError) {
    return (
      <ErrorScreen message="Lo sentimos, pero no encontramos el proyecto que buscas" />
    );
  } else if (projectStatus === "loading") {
    return <LoadingScreen />;
  }

  const mainView = (
    <div className={isMobile ? "-mt-2" : ""}>
      <div className="py-8 px-12 flex justify-center max-w-xs mx-auto">
        <Link className="w-1/2" to={routes.audioset(idOrUrl)}>
          <img
            className="animate-pulse-slow  hover:animate-none"
            src="/play.png"
            alt="Entrar"
          />
        </Link>
      </div>
      <PageDesktop
        page={page}
        padding={isDesktop ? "px-8" : ""}
        full={isDesktop}
      />
    </div>
  );

  const imageSrc = project?.meta.logo_url;

  return (
    <Layout desktop={mainView}>
      {imageSrc && (
        <img className="w-full" alt={project?.meta.title} src={imageSrc} />
      )}
      {project?.audiosets.map((reference) => {
        const isCurrent = reference.publish_path === idOrUrl;
        return (
          <React.Fragment key={reference.id}>
            <ProjectAudiosetItem
              className={isCurrent ? "bg-gray-lighter" : ""}
              reference={reference}
              linkTo={routes.readme(reference.publish_path)}
            />
            {isMobile && isCurrent && mainView}
          </React.Fragment>
        );
      })}
      )
    </Layout>
  );
};

export default CommunityReadmePage;
