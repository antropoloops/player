import React from "react";
import { ReactComponent as DownloadIcon } from "../../assets/download.svg";

type Props = {
  title: string;
  fileUrl: string;
  error?: any;
};

const DownloadFile: React.FC<Props> = ({ title, fileUrl, error }) => {
  return (
    <a
      href={fileUrl}
      className="w-full p-4 text-white flex flex-col items-center hover:text-white-light focus:outline-none"
      onClick={(e) => {
        if (!fileUrl) e.preventDefault();
      }}
    >
      <h1 className="text-xl">{title}</h1>
      <div className="p-2 text-center">
        {error ? (
          <p>
            Parece que el fichero no existe. Algunos están todavía en proceso.{" "}
            <br />
            Si crees que es un error, por favor, escríbenos a
            hola@antropoloops.com
          </p>
        ) : !fileUrl ? (
          <p>Cargando...</p>
        ) : fileUrl ? (
          <DownloadIcon className="w-12 h-12 shadow" />
        ) : (
          <p>Fichero aun no disponible</p>
        )}
      </div>
    </a>
  );
};
export default DownloadFile;
