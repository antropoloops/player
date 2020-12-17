import React, { useEffect } from "react";
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
import { Scroll } from "../components/Scroll";
import { scrollToTop } from "../hooks/useScrollTop";
import ListHeader from "../components/shared/ListHeader";

type Props = {
  idOrUrl: string;
};

const CommunityReadmePage: React.FC<Props> = ({ idOrUrl }) => {
  useAnalytics();
  const { isDesktop, isMobile } = useDeviceType();
  const { isError, data: audioset } = useQuery(
    ["bundle", idOrUrl],
    () => API.bundles.get({ path: idOrUrl }),
    { retry: false }
  );
  const { data: project, status: projectStatus } = useQuery(
    ["community"],
    () => API.bundles.get({ path: "comunidad" }).then(communityProject),
    { retry: false }
  );

  const pageUrl = audioset?.meta.description.split("cosmic@")[1];
  const { data: page } = usePage(pageUrl || "", { enabled: !!pageUrl });

  useEffect(() => {
    isMobile && scrollToTop();
  }, [idOrUrl, isMobile]);

  if (isError) {
    return (
      <ErrorScreen message="Lo sentimos, pero no encontramos el proyecto que buscas" />
    );
  } else if (projectStatus === "loading") {
    return <LoadingScreen />;
  }

  const mainView = (
    <div className={isMobile ? "-mt-2" : ""}>
      <div className="flex justify-center max-w-content p-4">
        <Link
          className={"my-2 w-1/3 md:w-1/6 shadow"}
          to={routes.audioset(idOrUrl)}
        >
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

  const current = project?.audiosets.find((a) => a.publish_path === idOrUrl);
  const all = project?.audiosets || [];

  return (
    <Layout
      title={current ? current.title : ""}
      desktop={mainView}
      backTo={routes.community()}
    >
      <Scroll>
        {imageSrc && (
          <img
            className="w-full"
            alt={project?.meta.title}
            src={current?.logo_url}
          />
        )}
        {isMobile && mainView}
        <ListHeader label="Comunidad" />
        {all.map((reference) => {
          const isCurrent = reference.publish_path === idOrUrl;
          return (
            <React.Fragment key={reference.id}>
              <ProjectAudiosetItem
                className={isCurrent ? "bg-gray-lighter" : ""}
                reference={reference}
                linkTo={routes.readme(reference.publish_path)}
              />
            </React.Fragment>
          );
        })}
        )
      </Scroll>
    </Layout>
  );
};

export default CommunityReadmePage;
