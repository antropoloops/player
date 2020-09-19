import React from "react";
import { Audioset } from "../../../audioset";
import { KeyboardController } from "../../../player/Control";
import { useDeviceType } from "../../hooks/useDeviceType";
import { PlayerState } from "../../simplePlayer";
import Controls from "./Controls";
import SimpleMapVisuals from "./SimpleMapVisuals";
import SimplePanelVisuals from "./SimplePanelVisuals";

type Props = {
  audioset: Audioset;
  state: PlayerState;
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
