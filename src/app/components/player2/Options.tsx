import React from "react";
import routes from "../../routes";
import { Audioset } from "../../../audioset";
import { Link } from "react-router-dom";

type Props = { audioset: Audioset };

const Options: React.FC<Props> = ({ audioset }) => {
  return (
    <div className="p-4">
      <Link to={routes.audioset(audioset.meta.path)}>Cerrar</Link>
    </div>
  );
};
export default Options;
