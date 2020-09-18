import React, { useState } from "react";
import { Audioset } from "../../../audioset";
import { KeyboardController } from "../../../player/Control";
import { useDeviceType } from "../../hooks/useDeviceType";
import { PlayerState } from "../../simplePlayer";
import IconButton from "../shared/IconButton";
import SimpleMapVisuals from "./SimpleMapVisuals";
import SimplePanelVisuals from "./SimplePanelVisuals";
import VirtualKeyboard from "./VirtualKeyboard";
import { ReactComponent as KeyboardIcon } from "../icons/keyboard-24px.svg";

type Props = {
  audioset: Audioset;
  state: PlayerState;
  keyboard: KeyboardController;
};

type ControlType = "none" | "keyboard";

const Visuals: React.FC<Props> = ({ audioset, state, keyboard }) => {
  const [control, setControl] = useState<ControlType>("none");
  const { isMobile } = useDeviceType();
  const Component =
    audioset.visuals.mode === "map" ? SimpleMapVisuals : SimplePanelVisuals;

  if (isMobile) return <Component audioset={audioset} state={state} />;

  return (
    <div className="w-full h-full flex flex-col relative">
      <Component audioset={audioset} state={state} />

      <div className="absolute bottom-0 left-0 right-0">
        {control === "keyboard" ? (
          <VirtualKeyboard
            audioset={audioset}
            keyboard={keyboard}
            onClose={() => setControl("none")}
          />
        ) : (
          <div className="mb-2">
            <IconButton
              icon={KeyboardIcon}
              onClick={() => setControl("keyboard")}
            >
              Teclado
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};
export default Visuals;
