import React, { Suspense } from "react";
import { useQuery } from "react-query";
import { isAudioset, isProject } from "../audioset";
import useAnalytics from "../hooks/useAnalytics";
import LoadingScreen from "../components/LoadingScreen";
import API from "../api";
import { Redirect } from "react-router-dom";
import routes from "../routes";
import ErrorScreen from "../components/ErrorScreen";

type Props = {
  idOrUrl: string;
};

const SimplePlayerScreen = React.lazy(() =>
  import("../components/simple-player/SimplePlayerScreen")
);

const AudiosetShowPage: React.FC<Props> = ({ idOrUrl }) => {
  useAnalytics();
  const { isLoading, isError, data: bundle } = useQuery(
    ["bundle", { path: idOrUrl }],
    (_, params) => API.bundles.get(params),
    { retry: false }
  );

  if (isError)
    return (
      <ErrorScreen message="Lo sentimos, pero no encontramos el audioset que buscas" />
    );
  else if (isLoading || !bundle) return <LoadingScreen />;

  if (isProject(bundle)) return <Redirect to={routes.project(idOrUrl)} />;

  return isAudioset(bundle) ? (
    <Suspense fallback={<LoadingScreen />}>
      <SimplePlayerScreen audioset={bundle} />
    </Suspense>
  ) : null;
};

export default AudiosetShowPage;
