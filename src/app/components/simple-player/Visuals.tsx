import React, { useState } from "react";
import { Audioset } from "../../../audioset";
import { KeyboardController } from "../../../player/Control";
import { useDeviceType } from "../../hooks/useDeviceType";
import { PlayerState } from "../../simplePlayer";
import IconButton from "../shared/IconButton";
import SimpleMapVisuals from "./SimpleMapVisuals";
import SimplePanelVisuals from "./SimplePanelVisuals";
import VirtualKeyboard from "./VirtualKeyboard";
import AudioSettings from "./AudioSettings";
import { ReactComponent as KeyboardIcon } from "../icons/keyboard-24px.svg";
import { ReactComponent as AudioIcon } from "../icons/audiotrack-24px.svg";
import { ReactComponent as FullscreenIcon } from "../icons/fullscreen-24px.svg";
import { ReactComponent as FullscreenExitIcon } from "../icons/fullscreen_exit-24px.svg";
import { useFullscreen } from "../../hooks/useFullscreen";

type Props = {
  audioset: Audioset;
  state: PlayerState;
  keyboard: KeyboardController;
};

type ControlType = "none" | "keyboard" | "audio";

const Visuals: React.FC<Props> = ({ audioset, state, keyboard }) => {
  const [control, setControl] = useState<ControlType>("none");
  const { isMobile } = useDeviceType();
  const Component =
    audioset.visuals.mode === "map" ? SimpleMapVisuals : SimplePanelVisuals;
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  if (isMobile) return <Component audioset={audioset} state={state} />;

  return (
    <div className="w-full h-full flex flex-col relative">
      <Component audioset={audioset} state={state} />

      <div className="absolute bottom-0 left-0 right-0 pb-2">
        {control === "keyboard" ? (
          <VirtualKeyboard
            audioset={audioset}
            keyboard={keyboard}
            onClose={() => setControl("none")}
          />
        ) : control === "audio" ? (
          <AudioSettings onClose={() => setControl("none")} />
        ) : (
          <div className="flex">
            <IconButton
              className="mr-2"
              icon={isFullscreen ? FullscreenExitIcon : FullscreenIcon}
              onClick={toggleFullscreen}
            >
              {isFullscreen
                ? "Salir de pantalla completa"
                : "Pantalla completa"}
            </IconButton>
            <IconButton
              className="mr-2"
              icon={KeyboardIcon}
              onClick={() => setControl("keyboard")}
            >
              Teclado
            </IconButton>
            {false && (
              <IconButton
                className="mr-2"
                icon={AudioIcon}
                onClick={() => setControl("audio")}
              >
                Sonido
              </IconButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Visuals;
