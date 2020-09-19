import React from "react";
import { useQuery } from "react-query";
import { isAudioset, isProject } from "../../audioset";
import useAnalytics from "../hooks/useAnalytics";
import LoadingScreen from "../components/LoadingScreen";
import API from "../api";
import SimplePlayerScreen from "../components/simple-player/SimplePlayerScreen";
import { Redirect } from "react-router-dom";
import routes from "../routes";

type Props = {
  idOrUrl: string;
};

const AudiosetShowPage: React.FC<Props> = ({ idOrUrl }) => {
  useAnalytics();
  const { status, data: bundle } = useQuery(
    ["bundle", { path: idOrUrl }],
    (_, params) => API.bundles.get(params)
  );

  if (status === "loading" || !bundle) return <LoadingScreen />;
  if (isProject(bundle)) return <Redirect to={routes.project(idOrUrl)} />;

  return isAudioset(bundle) ? <SimplePlayerScreen audioset={bundle} /> : null;
};

export default AudiosetShowPage;
