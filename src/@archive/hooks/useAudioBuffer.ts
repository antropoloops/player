import { useEffect, useState } from "react";
import { blobToBuffer } from "../lib/web-audio";
import useSimpleAudioContext from "./useSimpleAudioContext";

export default function useAudioBuffer(blob?: Blob) {
  const [buffer, setBuffer] = useState<AudioBuffer>();
  const ctx = useSimpleAudioContext();

  useEffect(() => {
    setBuffer(undefined);
    if (!blob) return;

    blobToBuffer(ctx, blob).then((buffer) => {
      setBuffer(buffer);
    });
  }, [ctx, blob]);

  return { buffer };
}
