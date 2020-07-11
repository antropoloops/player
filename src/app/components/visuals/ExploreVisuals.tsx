import React from "react";
import { Audioset } from "../../../audioset";

type Props = {
  audioset: Audioset;
};

const ExploreVisuals: React.FC<Props> = ({ audioset }) => {
  if (audioset.visuals.mode !== "panel") return null;

  return (
    <div className="h-full w-full flex flex-col items-start">
      <img src={audioset.visuals.image.url} alt="fondo" />
    </div>
  );
};
export default ExploreVisuals;
