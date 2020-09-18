import React from "react";
import { Audioset } from "../../../audioset";
import { KeyboardController } from "../../../player/Control";
import { useDeviceType } from "../../hooks/useDeviceType";
import { PlayerState } from "../../simplePlayer";
import SimpleMapVisuals from "./SimpleMapVisuals";
import SimplePanelVisuals from "./SimplePanelVisuals";
import VirtualKeyboard from "./VirtualKeyboard";

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
    <div className="w-full h-full flex flex-col">
      <Component audioset={audioset} state={state} />
      <VirtualKeyboard audioset={audioset} keyboard={keyboard} />
    </div>
  );
};
export default Visuals;
