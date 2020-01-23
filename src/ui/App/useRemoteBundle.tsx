import { useEffect, useState } from "react";
import { Bundle as BundleData } from "../../audioset";
import { fetchAudioset } from "./fetchAudioset";

export function useRemoteBundle(idOrUrl: string) {
  const [bundle, setBundle] = useState<BundleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let didCancel = false;

    function fetch() {
      setLoading(true);
      fetchAudioset(idOrUrl)
        .then(result => {
          if (!didCancel) {
            setLoading(false);
            setBundle(result);
          }
        })
        .catch(setError);
    }

    fetch();
    return () => {
      didCancel = true;
    };
  }, [idOrUrl]);

  return { bundle, loading, error };
}
