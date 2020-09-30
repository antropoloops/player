import React, { useRef, useEffect } from "react";
import { ClipStatus4 } from "../../player4";

type Props = {
  url: string;
  status: ClipStatus4;
  loop?: boolean;
  onStateChange?: (ready: boolean, duration: number) => void;
  onEnded?: () => void;
};

const AudioStream: React.FC<Props> = ({
  url,
  status,
  loop,
  onStateChange,
  onEnded,
}) => {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const handleLoaded = onStateChange
      ? () => onStateChange(true, el.duration)
      : undefined;

    handleLoaded && el.addEventListener("loadedmetadata", handleLoaded);
    onEnded && el.addEventListener("ended", onEnded);

    return () => {
      handleLoaded && el.removeEventListener("loadedmetadata", handleLoaded);
      onEnded && el.removeEventListener("ended", onEnded);
    };
  }, [onStateChange, onEnded]);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.currentTime = 0;
    if (status?.playing) ref.current.play();
    else ref.current.pause();
  }, [status]);

  return <audio ref={ref} src={url} loop={loop} />;
};

export default AudioStream;
