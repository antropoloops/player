import React from "react";
import { useFullscreen } from "../hooks/useFullscreen";

type Props = {
  onClose: () => void;
  onStop: () => void;
  onQuit: () => void;
};

const ConfigPage: React.FC<Props> = ({ onClose, onStop, onQuit }) => {
  const { toggleFullscreen, isFullscreen } = useFullscreen();
  return (
    <div className="p-4 flex flex-col">
      <h3 className="text-lg text-gray-light font-medium pb-4">
        Configuración
      </h3>
      <button
        className="p-2 opacity-50 bg-gray-light"
        onClick={() => {
          toggleFullscreen();
          onClose();
        }}
      >
        {isFullscreen
          ? "Salir de pantalla completa"
          : "Poner en pantalla completa"}
      </button>
      <button
        className="p-2 mt-4 text-red opacity-50 bg-gray-dark"
        onClick={onStop}
      >
        Parar los sonidos
      </button>
      <button
        className="p-2 mt-4 text-white bg-red opacity-50 bg-gray-dark"
        onClick={onQuit}
      >
        Parar y salir
      </button>
    </div>
  );
};

export default ConfigPage;
