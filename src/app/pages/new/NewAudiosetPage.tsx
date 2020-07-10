import React from "react";
import { useQuery } from "react-query";
import Layout from "../../components/layout/Layout";
import { useRouteMatch, Link } from "react-router-dom";
import { useDeviceType } from "../../hooks/useDeviceType";
import API from "../../api";
import LoadingPage from "../LoadingPage";
import routes from "../../routes";
import { Markdown } from "../../components/Markdown";

type Props = {};

type RouteParams = {
  id: string;
};

const AudiosetPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { isMobile } = useDeviceType();
  const { data: audioset } = useQuery(
    ["project", { path: params.id }],
    (_, p) => API.audiosets.get(p)
  );
  if (!audioset) return <LoadingPage />;

  return (
    <Layout
      title={audioset.meta.title}
      backTo={
        audioset.meta.parent_path
          ? routes.project(audioset.meta.parent_path)
          : routes.projects()
      }
      desktop={
        <Markdown className="text-white p-4" markdown={audioset.meta.readme} />
      }
    >
      <div className="flex-grow overflow-y-scroll">
        <img
          className="w-full"
          alt={audioset.meta.title}
          src={audioset.meta.logo_url}
        />
        {isMobile && (
          <div className="p-4">
            <Markdown className="text-white" markdown={audioset.meta.readme} />
          </div>
        )}
      </div>
      <div>
        <div className="w-full p-4 bg-gray-medium">
          <div className="w-full flex justify-center">
            <Link
              to={routes.player(audioset.meta.path)}
              className="p-2 rounded-full bg-green"
            >
              <img className="h-8" src="/play.png" alt="Start" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AudiosetPage;
