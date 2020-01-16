import React, { useEffect, useState } from "react";
import { Bundle as BundleData, isAudioset, Project } from "../../audioset";
import { fetchAudioset } from "../../player/fetchAudioset";
import { Player } from "../Player";
import { Project as ProjectView } from "../Project";
import "./App.css";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { useBundleLoadStatus } from "./useBundleLoadStatus";

interface BundleProps {
  idOrUrl: string;
}
export const Bundle = ({ idOrUrl }: BundleProps) => {
  const { bundle, loading } = useFetchAudioset(idOrUrl);
  if (loading) {
    return <Loading />;
  } else if (bundle) {
    return isAudioset(bundle) ? (
      <Player audioset={bundle} />
    ) : (
      <ProjectView project={bundle as Project} />
    );
  } else {
    return <NotFound />;
  }
};

function useFetchAudioset(idOrUrl: string) {
  const [bundle, setBundle] = useState<BundleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    fetchAudioset(idOrUrl)
      .then(result => {
        if (!didCancel) {
          setLoading(false);
          setBundle(result);
        }
      })
      .catch(setError);
    return () => {
      didCancel = true;
    };
  }, [idOrUrl]);

  return { bundle, loading, error };
}

export const BundleOld = ({ idOrUrl }: BundleProps) => {
  const loadStatus = useBundleLoadStatus(idOrUrl);

  switch (loadStatus.stage) {
    case "loading":
      return <Loading />;
    case "ready":
      const bundle = loadStatus.payload;
      return isAudioset(bundle) ? (
        <Player audioset={bundle} />
      ) : (
        <ProjectView project={bundle as Project} />
      );
    case "error":
      return <NotFound />;
    default:
      return (
        <pre style={{ color: "white" }}>
          {JSON.stringify(loadStatus, null, 2)}
        </pre>
      );
  }
};
