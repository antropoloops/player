import React from "react";
import { Audioset } from "../../Audioset";
import { ResourceLoadStatus } from "../../Player/ResourceLoader";
import { Markdown } from "../shared/Markdown";

interface PreviewProps {
  audioset: Audioset;
  resourceStatus: ResourceLoadStatus;
  onStart: () => void;
}

const Preview = ({ audioset, onStart, resourceStatus }: PreviewProps) => {
  return (
    <div className="Preview">
      <img alt={audioset.meta.title} src={audioset.meta.logo_url} />

      <div className="inside">
        <div>{audioset.meta.description}</div>
        <Markdown markdown={audioset.meta.readme} />
        {resourceStatus.status === "loading" && (
          <div>
            <h2>Cargando...</h2>
            {resourceStatus.completed}/{resourceStatus.total}
          </div>
        )}
        {resourceStatus.status === "pending" && (
          <button onClick={onStart}>Entrar</button>
        )}
      </div>
    </div>
  );
};

export default Preview;
