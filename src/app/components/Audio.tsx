import React, { useRef, useEffect } from "react";

type Props = {
  src: string;
  play: boolean;
  loop?: boolean;
  onLoaadedMetadata?: () => void;
  onEnded?: () => void;
};

const Audio: React.FC<Props> = ({
  src,
  play,
  loop,
  onLoaadedMetadata,
  onEnded,
}) => {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    if (onLoaadedMetadata)
      el.addEventListener("loadedmetadata", onLoaadedMetadata);
    if (onEnded) el.addEventListener("ended", onEnded);

    return () => {
      if (onLoaadedMetadata)
        el.removeEventListener("loadedmetadata", onLoaadedMetadata);
      if (onEnded) el.removeEventListener("ended", onEnded);
    };
  }, [onLoaadedMetadata, onEnded]);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.currentTime = 0;
    if (play) ref.current.play();
    else ref.current.pause();
  }, [play]);

  return <audio ref={ref} src={src} loop={loop} />;
};

export default Audio;
