import React from "react";
import useDimensions from "react-cool-dimensions";
import { Audioset } from "../../../audioset";
import { Spinner } from "../Spinner";

type Props = {
  audioset: Audioset;
  activeClipId: string;
};

const ExploreVisuals: React.FC<Props> = ({ audioset, activeClipId }) => {
  const { ref, width } = useDimensions<HTMLImageElement>();
  if (audioset.visuals.mode !== "panel") return null;

  const ratio = width / audioset.visuals.image.size.width;
  const clip = audioset.index.clipById[activeClipId];
  const left = clip ? clip.position[0] * ratio : 0;
  const top = clip ? clip.position[1] * ratio : 0;

  return (
    <div className="h-full w-full flex flex-col items-start relative">
      <img ref={ref} src={audioset.visuals.image.url} alt="fondo" style={{}} />
      {clip && (
        <Spinner
          className="absolute spin"
          color={clip.color}
          style={{ left, top, width: 100, height: 100 }}
        />
      )}
    </div>
  );
};
export default ExploreVisuals;
