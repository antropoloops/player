import React from "react";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import { useRouteMatch } from "react-router-dom";
import { useDeviceType } from "../../hooks/useDeviceType";
import API from "../../api";
import LoadingPage from "../LoadingPage";

type Props = {};

type RouteParams = {
  id: string;
};

const AudiosetExplorePage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { isMobile } = useDeviceType();
  const { data: audioset } = useQuery(
    ["project", { path: params.id }],
    (_, p) => API.audiosets.get(p)
  );
  if (!audioset) return <LoadingPage />;

  return <Layout header={audioset.meta.title}>List topics</Layout>;
};

export default AudiosetExplorePage;
