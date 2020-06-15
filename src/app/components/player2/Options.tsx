import React from "react";
import routes from "../../routes";
import { Audioset } from "../../../audioset";
import { Link } from "react-router-dom";

type Props = { audioset: Audioset };

const Options: React.FC<Props> = ({ audioset }) => {
  return (
    <div className="p-4">
      <Link
        className="bg-gray-light shadow rounded p-2 hover:text-white-light"
        to={routes.audioset(audioset.meta.path)}
      >
        Parar y salir
      </Link>
    </div>
  );
};
export default Options;
