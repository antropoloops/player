import React from "react";
import { Audioset } from "../../audioset";
import { KeyboardController } from "../../player/KeyboardController";
import { useDeviceType } from "../../hooks/useDeviceType";
import { State4 } from "../../player4";
import Controls from "./Controls";
import SimpleMapVisuals from "./VisualsGeography";
import SimplePanelVisuals from "./VisualsPanel";

type Props = {
  audioset: Audioset;
  state: State4;
  keyboard: KeyboardController;
};

const Visuals: React.FC<Props> = ({ audioset, state, keyboard }) => {
  const { isMobile } = useDeviceType();
  const Component =
    audioset.visuals.mode === "map" ? SimpleMapVisuals : SimplePanelVisuals;

  if (isMobile) return <Component audioset={audioset} state={state} />;

  return (
    <div className="w-full h-full flex flex-col relative">
      <Component audioset={audioset} state={state} />
      <Controls audioset={audioset} keyboard={keyboard} />
    </div>
  );
};
export default Visuals;
