import { Storage } from "@aws-amplify/storage";
import { useEffect, useState } from "react";
import useSimpleAudioContext from "./useSimpleAudioContext";
import { StoredFile } from "../../models";

export default function useAudioFile(file?: StoredFile) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentKey, setCurrentKey] = useState("");
  const [buffer, setBuffer] = useState<AudioBuffer | undefined>();
  const [error, setError] = useState<any>();
  const ctx = useSimpleAudioContext();

  useEffect(() => {
    if (file && file.key !== currentKey) {
      setBuffer(undefined);
      setCurrentKey(file.key);
    }
  }, [file, currentKey]);

  const load = async () => {
    if (!file) return;
    try {
      setIsLoading(true);
      const signedUrl = await Storage.get(file.key, { download: false });
      const response = await fetch(signedUrl.toString());
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await ctx.decodeAudioData(arrayBuffer);
      setBuffer(buffer);
      return buffer;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { buffer, load, isLoading, error };
}