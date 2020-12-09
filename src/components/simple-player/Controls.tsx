import React, { useEffect, useState } from "react";
import { IconButton } from "../shared/IconButton";
import VirtualKeyboard from "./VirtualKeyboard";
import AudioSettings from "./AudioSettings";
import { ReactComponent as KeyboardIcon } from "../icons/keyboard-24px.svg";
import { ReactComponent as MuteIcon } from "../icons/volume_off-24px.svg";
import { ReactComponent as FullscreenIcon } from "../icons/fullscreen-24px.svg";
import { ReactComponent as FullscreenExitIcon } from "../icons/fullscreen_exit-24px.svg";
import { useFullscreen } from "../../hooks/useFullscreen";
import { Audioset } from "../../audioset";
import { KeyboardController } from "../../player4";
import useAudioOutput from "../../hooks/useAudioOutput";

type Props = {
  audioset: Audioset;
  keyboard: KeyboardController;
};

type ControlType = "none" | "keyboard" | "audio";

const Controls: React.FC<Props> = ({ audioset, keyboard }) => {
  const { output } = useAudioOutput();
  const [muted, setMuted] = useState(false);
  const [control, setControl] = useState<ControlType>("none");
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  useEffect(() => {
    if (!output) return;
    output.gain.value = muted ? 0 : 1;
  }, [muted, output]);

  return (
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
            {isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          </IconButton>
          <IconButton
            className="mr-2"
            icon={KeyboardIcon}
            onClick={() => setControl("keyboard")}
          >
            Teclado
          </IconButton>

          <IconButton
            className="mr-2 fill-current"
            color={muted ? "text-blue-500" : undefined}
            icon={MuteIcon}
            onClick={() => setMuted(!muted)}
          >
            {muted ? "Activar sonido" : "Apagar sonido"}
          </IconButton>
        </div>
      )}
    </div>
  );
};
export default Controls;
